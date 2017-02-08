'use strict'

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const db_url = 'mongodb://localhost:27017/ArmDev';
const body_parser = require('body-parser');
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({
    extended: true
});
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt')
const cors = require('cors');
const fs = require('fs');
const config = {
    secret: "iterate",
}
let jwtCheck = express_jwt({
    secret: config.secret
});
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './testData/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + file.fieldname + '-' + Date.now() + '.jpg')
    }
})
const upload = multer({
    storage: storage
});
app.use('/protected', jwtCheck);
const createToken = (user) => {
    console.log(_.omit(user, 'password'));
    return jwt.sign(_.omit(user, 'password'), config.secret, {
        expiresIn: 60 * 60 * 24 * 180
    });
}
http.listen(8080, () => console.log('server started on port 8080'));


app.post('/user_registration', json_parser, form_parser, (req, res) => {
    let userData = req.body;
    console.log(userData);
    MongoClient.connect(db_url, async(err, db) => {
        if (err) {
            console.log('Error connecting to the DB: ' + err);
        } else {
            console.log("Successfully connected to the DB.");
            const collection = db.collection('users');
            let len = await collection.count();
            userData.id = await len++;
            await collection.insert([userData], (err, result) => {
                if (err) {
                    console.log("Could not insert in the DB: " + err);
                } else {
                    console.log("Successfully added the new user to the DB.");
                    res.status(201).send({
                        id_token: createToken(userData),
                        youInfo: userData,
                    });
                }
                db.close();
            });
        }
    });
});
app.post('/uname_check', json_parser, form_parser, (req, res) => {
    const unameToCheck = req.body.uname;
    MongoClient.connect(db_url, (err, db) => {
        if (err) {
            console.log('Error connecting to the DB: ' + err);
            res.status(404).end();
        } else {
            console.log("Successfully connected to the DB.");
            const collection = db.collection('users');
            collection.find({
                uname: unameToCheck
            }).toArray((err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    if (results.length === 0) {
                        res.status(200).send(JSON.stringify({
                            unameAvailable: 1
                        }));
                    } else {
                        res.status(200).send(JSON.stringify({
                            unameAvailable: 0
                        }));
                    }
                }
            });
        }
    });
});
app.post('/user_login', json_parser, form_parser, (req, res) => {
    const credentials = req.body;
    MongoClient.connect(db_url, (err, db) => {
        if (err) {
            console.log('Error connecting to the DB: ' + err);
            res.status(404).end();
        } else {
            console.log("Successfully connected to the DB.");
            const collection = db.collection('users');
            collection.find({
                uname: credentials.emailOrUsername
            }).toArray((err, results) => { //also need to check in Emails
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                    if (results.length === 0) {
                        res.status(200).send(JSON.stringify({
                            respond: 0
                        })); //user not found
                    } else {
                        if (credentials.password === results[0].password) {
                            console.log('user logged in');
                            res.status(200).send(JSON.stringify({
                                respond: 1,
                                id_token: createToken(credentials),
                                youInfo: results[0],
                            })); //successfully logged in
                        } else {
                            res.status(200).send(JSON.stringify({
                                respond: 0
                            })); //login failed
                        }
                    }
                }
            });
        }
    });
});
const posts = require("./testData/postsForFeed.js");
app.get('/protected/get_feed', (req, res) => {
    res.status(200).send(JSON.stringify({
        posts
    }));
})
const msgs = require('./testData/forumMessages.js');
app.post('/protected/get_forum_messages', json_parser, form_parser, (req, res) => {
    switch (req.body.fetchTitle) {
        case 'reactjs':
            res.status(200).send(JSON.stringify({
                msgs
            }));
            break;
        case 'android':
            res.status(200).send(JSON.stringify({
                msgs
            }));
            break;
        default:
    }
});
app.post('/send_user_image', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.status(200).send('image received');
});
app.post('/get_user_image', json_parser, form_parser, (req, res) => {
    fs.readFile(`./testData/images/${req.body.imageName}`, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.writeHead(200, {
            'Content-Type': 'image/jpg'
        });
        res.end(img, 'binary');
    });
})