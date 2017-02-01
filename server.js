'use strict'

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const db_url = 'mongodb://localhost:27017/ArmDev';
const body_parser = require('body-parser');
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({extended: true});
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt')
const cors = require('cors');

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());


http.listen(8080, () => console.log('turned on 8080'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/build/index.html');
});
const config = {
  secret: "iterate",
}
const createToken = (user) => {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*24*180 });
}

app.post('/user_registration', json_parser, form_parser, (req, res) => {
  let userData = req.body;
  console.log(userData);
  MongoClient.connect(db_url, async (err, db)=>{
    if (err){
      console.log('Error connecting to the DB: ' + err);
    } else {
      console.log("Successfully connected to the DB.");
        const collection = db.collection('users');
        let len = await collection.count();
        userData.id = await len++;
        await collection.insert([userData], (err, result)=>{
          if (err){
            console.log("Could not insert in the DB: " + err);
          } else {
            res.status(201).send({
              id_token: createToken(userData),
            });
            console.log("Successfully added the new user to the DB.");
          }
          db.close();
        });
    }
  });
});
app.post('/uname_check', json_parser, form_parser, (req, res) => {
  const unameToCheck = req.body.uname;
  MongoClient.connect(db_url, (err, db)=>{
    if (err){
      console.log('Error connecting to the DB: ' + err);
      res.status(404).end();
    } else {
        console.log("Successfully connected to the DB.");
        const collection = db.collection('users');
        collection.find({uname: unameToCheck}).toArray((err, results)=> {
          if (err){
            console.log(err);
          } else{
            if (results.length===0){
              res.status(200).send(JSON.stringify({unameAvailable: 1}));
            } else{
                res.status(200).send(JSON.stringify({unameAvailable: 0}));
            }
          }
        });
    }
  });
});
app.post('/user_login', json_parser, form_parser, (req, res) => {
  const credentials = req.body;
  MongoClient.connect(db_url, (err, db)=>{
    if (err){
      console.log('Error connecting to the DB: ' + err);
      res.status(404).end();
    } else {
        console.log("Successfully connected to the DB.");
        const collection = db.collection('users');
        collection.find({uname: credentials.emailOrUsername}).toArray((err, results)=> {
          if (err){
            console.log(err);
          } else{
            if (results.length===0){
              res.status(200).send(JSON.stringify({respond: -1})); //user not found
            } else{
                if (credentials.password === results[0].password){
                  res.status(200).send({
                    id_token: createToken(credentials),
                    respond: 1
                  });
                } else{
                    res.status(200).send(JSON.stringify({respond: 0})); //login failed
                }
            }
          }
        });
    }
  });
});
const posts = require("./testData/postsForFeed.js");
app.get('/get_feed', (req, res) => {
  res.status(200).send(JSON.stringify({posts}));
})
const msgs = [
  {
    author: {
      fullName: 'Bob Franklin'
    },
    time: '22/12/2010',
    text: 'that was just great!',
  },
  {
    author: {
      fullName: 'Frank Boblin'
    },
    time: '25/12/2010',
    text: 'that was just great! And I want to add that bla bla bla',
  }
];
app.get('/get_feed', (req, res) => {
  res.status(200).send(JSON.stringify({posts}));
})
app.post('/getInfo', json_parser, form_parser, (req, res) => {
  switch (req.body.fetchTitle) {
    case 'reactjs':
      res.status(200).send(JSON.stringify({msgs}));
      break;
    case 'android':
      res.status(200).send(JSON.stringify({msgs}));
      break;
    default:
  }
});
//SESSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let jwtCheck = express_jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', (req, res) => {
  res.status(200).send('hello, it\'s me');
});
