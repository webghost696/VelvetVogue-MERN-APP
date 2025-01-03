var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb+srv://yashhabib:Yash123%40@yashhabib.qi045.mongodb.net/";
var axios = require('axios');

var app = express();
app.use(cors({
  origin: 'https://velvetvogue-5d4e9.web.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
var db;

async function ConnectDB() {
    try{
        const client = await mongoClient.connect(connectionString);
        console.log("Connected to MongoDB");
        db = client.db("ReactDB");
    }
    catch{
        console.log("Failed to Connect");
        process.exit(1);
    }
}

ConnectDB();

app.get("/", (req, res) => {
    res.send("Welcome to my server!");
});


app.get("/getusers", async (req, res) => {
    if(db){
        const users = await db.collection("tblUsers").find({}).toArray();
        res.send(users);
    }
});

app.post("/registeruser", async (req, res) => {
    var UserData = {
        Name : req.body.Name,
        Email : req.body.Email,
        Mobile : parseInt(req.body.Mobile),
        Password : req.body.Password
    }
    if(db) {
        try {
            const result = await db.collection("tblUsers").insertOne(UserData);
            console.log("Data Saved");
            res.status(200).json({
                message: "User registered successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to save user", error });
        }
    }  
    else {
        res.status(500).json({ message: "Database not connected" });
    }
});

const port = process.env.PORT || 4000;
const host = '0.0.0.0';


app.listen(port, host);
console.log(`Server Running : ${port}`);
