//posts description json
//we will be creating one seprate constants file for storing stings constants like user_role
//same as we created for stored Procedures
//trainer/client(name) and trainer/client(name) use this in redux/context-> Purpose we are going to 
//use them multiple thimes on UI 
//create default json structure so that while registering triner/clients into the system 
//they should be having 0 followers, 0 following, 0 clients to the trainer
let post = {
    user_id:10 ,
    user_role : "triner/client",
    description : "stringified json that will contain ClientName + description + likes + image_path + date"
}

let testing = {
    name : "pratik lavhale",
    post_description : "work hard or go home",
    likes : 0,
    image_path : "",
    date : ""
}
console.log(JSON.stringify(testing))

let extra_deatils = {
    name: 'pratik',
    age: 26,
    address: 'gadge nagar near radhakrishna temple amravati..',
    followers : 20,
    following : 20,
    client_count : 20
  }




