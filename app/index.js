const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const dotenv = require('dotenv');
const passwordHash = require('password-hash');
const dbUrl = 'mongodb://dbserver:27017/blog-app-db';
const Users = require('./models/dbUsers')

dotenv.config();

const secretkey = process.env.USER_KEY;

//DB Config
mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("MongoDB connected successfully");
});

//Middlewares
app.use(express.json())
app.use(cors(
    {
        origin: 'http://reactserver:3000'
    }))



//API EndPoints
app.get('/api/articles', (req, res) => {
    res.send("All articles")
})

app.post('/api/users', async (req, res) => {
    try{

        const {login, pwd, role} = req.body;
        // Validate user input
        if (!(login && pwd )) {
            return res.status(400).send("All input is required");
        }
        // check if user already
        // Validate if user exist in our database
        const oldUser = await Users.findOne({ login });

        if (oldUser) {
            console.log("user exist")
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt Password
        const hashedPassword = passwordHash.generate(pwd);

        // Create user in our database
        const user = await Users.create({
            login,
            pwd: hashedPassword,
            role
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, login },
            secretkey,
            {
                expiresIn: "2h",
            }
        );
        console.log(token)
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);

    }catch (err){
        console.log(err);
    }
});

app.get('/api/users', (req, res) => {
    Users.find((err, data) => {
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});

app.get('/api/posts', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => res.json(json));
});

app.get('/api', (req, res) => {
    res.send("Hello from NodeJs")
})

app.post('/api/articles/posts', verifyToken,(req, res) => {
    //Vérifier de manière asynchrone le jeton donné à l'aide d'un secret ou d'une clé publique pour obtenir un jeton décodé
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            res.sendStatus(403); //renvoi forbidden si erreur
        } else {
            res.json({
                message: 'article created...',
                authData
            });
        }
    });
});

app.post('/api/users/login', (req, res) => {
    const user = {
        username: "QL",
        password: "test"
    }
    //Sign the given payload into a JSON Web Token string payload
    jwt.sign({user: user}, secretkey, (err, token) => {
        res.json({
            token,
        });
        console.log('JWT:'+token)
    
    });
    return token 
});

//FUNCTION QUI VERIFIE QUE LA REQUETE CONTIENT BIEN LE TOKEN JWT
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403); //renvoi forbidden si erreur
    }
}

// function login(username,password){
//     app.post('/api/users/login', (req, res) => {
//             username,
//             password
//         //Sign the given payload into a JSON Web Token string payload
//         jwt.sign({user: user}, secretkey, (err, token) => {
//             res.json({
//                 token,
//             });
//         });
        
//     });
//     return token 
// }

//export pour test jest
module.exports = app