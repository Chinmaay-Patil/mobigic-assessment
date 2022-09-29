import React, {  useState} from "react"
import "./homepage.css"
import axios from "axios"
import filedownload from "js-file-download"
import { useHistory } from "react-router-dom"

const Homepage = ({ setLoginUser }) => {
    const [file, setFile] = useState();
    const [downloadFileName, setdownloadFileName] = useState();
    const [downloadFilePassword, setdownloadFilePassword] = useState();
    const [displaylist,setdisplaylist]=useState([]);
    function getAllFilesList() {
        
        try {
            axios.post("http://localhost:9002/getlist")

                .then(res => {
                    setdisplaylist(res.data);

                })
        } catch (err) {
            console.log(err)
        }

        
    }
    const download = (e) => {
        e.preventDefault();
        axios({
            url: "http://localhost:9002/download",
            method: "POST",
            responseType: "blob",
            data: {
                filename: downloadFileName,
                filepassword: downloadFilePassword
            }

        }).then((res) => {

            if (res.data.type === "text/html") {
                alert("incorrect Password")
            }
            else {

                filedownload(res.data, downloadFileName)
               
            }


        })
    }


    const handleShare = (e) => {
        e.preventDefault()
        const formData = new FormData();
        const email = localStorage.getItem("email");
        formData.append('file', file);
        formData.append('email',email);
        try {
               
                if(!email){
                    useHistory.push('/login')
                }

            axios.post(`http://localhost:9002/upload`, formData)

                .then(res => {
                    alert("your password for filename " + res.data.filename + " is " + res.data.password)
                   
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="homepage">
            <div>            <div className="uploadform">
                <form action="/upload" method="post" encType="multipart/form-data">
                    <div >
                        <label className="label" for="file">Select File:</label>
                        <input className="input" type="file" id="file" name="file" required onChange={(e) => { setFile(e.target.files[0]) }} />
                    </div>

                    <button className="button" type="submit" onClick={handleShare}>Upload</button>
                </form>
            </div>

                <div className="downloadform">
                    <label className="label" id="downloadlabel">Download:</label>
                    <div className="filename">
                        <label className="label">Enter File Name : </label>
                        <input className="input" id="passwordInput" type="text" onChange={(e) => { setdownloadFileName(e.target.value); }} ></input>
                    </div>
                    <div className="Password">
                        <label className="label" >Enter Password: </label>
                        < input className="input" id="passwordInput2" type="text" onChange={(e) => { setdownloadFilePassword(e.target.value); }} ></input>
                    </div>

                    <button className="button" onClick={download} >Download</button>



                      </div>
                      <button className="button" onClick={() => setLoginUser({})} >Logout</button>


            </div>

            <div className="getlist">
                <button className="buttonforgettinglist" onClick={getAllFilesList}>Click to get all Files</button>
                <div className="tablerows">
                <table>
                        <tr>
                      <th>filename</th>
                      <th>password</th>
                      
                    </tr>
                    </table>
               {
                displaylist.map((ele)=>{
                    
                    return <table>
                    <tr>
                      <th>{ele.originalName}</th>
                      <th>{ele.password}</th>
                      
                    </tr>
                    
                   
                  </table>
                })
               }


                </div>
            </div>

        </div>


    )
}

export default Homepage