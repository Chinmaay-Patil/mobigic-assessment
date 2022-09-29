var express = require('express');  
var app = express();  
var db =  require('./database');
var fs = require("fs");
const ImageKit = require('imagekit');
const bodyParser = require("body-parser");
const { response } = require('express');


const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/ite059er4',
  publicKey: 'public_UmbDwDAsGKTy26qlJPrGMyqgmcI=',
  privateKey: 'private_teqMLFxxA/NSv8VKc7sakMQ2z5M='
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //you can specify specific origin for you application in place of * you can put http://localhost:3000
  //* specifies allow all you can specify all types of data.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/',async(req,res,next)=>{
  console.log('inside get method');
  // testing res.send('get method triggered');
  try{
    const data = await db.getNames();
    res.send(data);
  }catch(e){
    console.log(e);
  }
});


app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get('/getListOfGifs', (req, res, next)=>{
  console.log('inside getListOfGifs');
  try{
    imagekit.listFiles({
      path : "legs"
  },  async function(error, result) { 
      if(error) console.log(error);
      else {
        let images = await result;
        res.send(images);
      }
        
  });
  }catch(execp){

  }
})


//req body would be userID and password..
app.post('/getTrainerLoginDetails', async(req, res,next)=>{
  try{
    const data = await db.getTrainerLoginDetails(req.body);
    res.send(data);
  }catch(exception){
    console.log(exception);
  }
});

app.get('/getGif', async(req, res, next)=>{
  try{
    console.log("inside get gif method...")
    //  const data = res.download('./Gif/bentover rowing.gif');
    //  console.log(data);
    fs.readFile('./Gif/bentover rowing.gif', (error, content)=>{
      if(error){
        res.writeHead(404, {"Content-type": "text/html"});
        res.end("<h1>No such file or image</h1>")
      }else{
        // res.setHeader('Content-Type', 'image/gif');
        // res.setHeader('Content-Length', ''); // Image size here
        // res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(content);
      }
    });
  }catch(exception){
    console.log(exception);
  }
})
//trainer registration..
app.post('/trainer_registration', async(req, res, next)=>{
  try{
    const data = await db.traitrainer_registration(req.body);
    res.send(data);
  }catch(exception){
    console.log(exception);
  }
});

app.post('/new_post', async(req, res, next)=>{
  try{
    const data = await db.new_post(req.body);
    res.send(data);
  }catch(exception){
    console.log(exception);
  }
})

app.get('/get_posts', async(req, res, next)=>{
  try{
    const data = await db.get_posts();
    res.send(data);
  }catch(exception){
    console.log(exception);
  }
})

app.post('/add_trainer_workout', async(req, res, next)=>{
  try{
    const data = await db.add_trainer_workout(req.body);
    res.send(data);
  }catch(exception){
    console.log(exception);
  }
})


app.listen(8080, ()=>{
  console.log(`Basics port for runing your host and you will be  on 8080`);
 
});



