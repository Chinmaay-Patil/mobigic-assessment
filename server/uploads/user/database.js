const { response } = require('express');
const {createPool} = require('mysql');
const Stored_Procedures = require('./storedProcedures');


const pool = createPool({
    host : "localhost",
    user : "root",
    password : "password",
    database : "fitnessapp",
    connectionLimit : 10,
    port : 3306
});
let db  = {};

db.getNames = () => {
    return new Promise((resolve, reject)=>{
        pool.query(`select * from test`,(err,result)=>{
            if(err)
                return reject(err);
            else
                return resolve(result);
        });
    });
}

db.getTrainerLoginDetails = (reqBody)=>{
    let StoredProc = Stored_Procedures.GET_TRAINER_DETAILS;
    return new Promise((resolve, reject)=>{
        pool.query(`CALL ${StoredProc}('${JSON.stringify(reqBody)}')`, (error, response)=>{
            if(error)
                return reject(err);
            else
                return resolve(response);
        })
    });
}


db.traitrainer_registration = (reqBody)=>{
    let StoredProc = Stored_Procedures.TRAINER_REGISTRATION;
    return new Promise((resolve, reject)=>{
        pool.query(`CALL ${StoredProc}('${JSON.stringify(reqBody)}')`, (error, response)=>{
            if(error)
                return reject(error);
            else
                return resolve(response);
        })
    });
}



db.new_post = (reqBody)=>{
    let StoredProc = Stored_Procedures.NEW_POST;
    return new Promise((resolve, reject)=>{
        pool.query(`CALL ${StoredProc}('${JSON.stringify(reqBody)}')`, (error, response)=>{
            if(error)
                return reject(error);
            else
                return resolve(response);
        })
    });

    let post = {
        "user_id":10 ,
        "user_role" : "triner",
        "description" : {"name":"pratik lavhale","post_description":"work hard or go home","likes":0,"image_path":"","date":""}
    }
}

db.add_trainer_workout = (reqBody)=>{
    let StoredProc = Stored_Procedures.ADD_WORKOUTS;
    return new Promise((resolve, reject)=>{
        pool.query(`CALL ${StoredProc}('${JSON.stringify(reqBody)}')`, (error, response)=>{
            if(error)
                return reject(error);
            else
                return resolve(response);
        })
    });

    let obj = {
        "trainer_id" : 1,
        "trainer_workout_urls" : "",
        "extra_details" : "",
        "body_part_name" : "back"
    }
    // SET @trainer_id := JSON_EXTRACT(requestBody, "$.trainer_id");
    // SET @trainer_workout_url := JSON_EXTRACT(requestBody, "$.trainer_workout_urls");
    // SET @extra_details := JSON_EXTRACT(requestBody, "$.extra_details");
    // SET @body_part := JSON_EXTRACT(requestBody, "$.body_part_name");
}
db.get_posts = ()=>{
    return new Promise((resolve, reject)=>{
        pool.query('select post_id, user_id, role_name, post_description from Posts ORDER BY post_id DESC', (error, response)=>{
            if(error)
                return reject(error);
            else
                return resolve(response);
        })
    });
}

module.exports = db;