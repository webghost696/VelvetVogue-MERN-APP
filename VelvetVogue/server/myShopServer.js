const express = require('express')
var app = express();
const cors = require('cors');
const axios = require('axios');
const mongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const connectionString = "mongodb+srv://yashhabib:Yash123%40@yashhabib.qi045.mongodb.net/admin?tls=true";

app.use(cors({
  origin: 'https://velvetvogue-vv.web.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
var db;

async function connectDB() {
    try{
        const client = mongoClient.connect(connectionString);
        console.log("Connected To MongoDB");
        db = (await client).db("shopDB");
    }
    catch {
        console.log("Failed To Conenct");
        process.exit(1);
    }
}

connectDB();

app.get("/clothing", async(req, res) => {
    if(db){
        const data = await db.collection("MyProducts").find({}).toArray();
        res.send(data);
    }
});

app.get("/clothing/men", async(req, res) => {
    if(db) {
        const data = await db.collection("MyProducts").find({category : "men"}).toArray();
        res.send(data);
    }
});

app.get("/clothing/women", async(req, res) => {
    if(db) {
        const data = await db.collection("MyProducts").find({category : "women"}).toArray();
        res.send(data);
    }
});

app.get("/clothing/:id", async(req, res) => {
    let prodId = parseInt(req.params.id);
    if(db){
        const data = await db.collection("MyProducts").findOne({id:prodId});
        res.send(data);
    }
});

app.post("/savedaddresses/:user", async (req, res) => {
    const userName = req.params.user;
    var address = {
        Name : req.body.Name,
        Address : req.body.Address,
        City : req.body.City,
        Zipcode : parseInt(req.body.Zipcode)
    }

    if(db) {
        try {
            const result = await db.collection(`SavedAddresses-${userName}`).insertOne(address);
            console.log("Address Saved");
            res.status(200).json({
                message: "Address saved successfully",
                data: result
            });
        }
        catch(error){
            res.status(500).json({ message: "Failed to save address", error });
        }
    }
    else {
        res.status(500).json({ message: "Database not connected" });
    }
});

app.get("/getaddress/:user", async (req, res) => {
    const userName = req.params.user;
    if(db) {
        const result = await db.collection(`SavedAddresses-${userName}`).find({}).toArray();
        res.send(result);
    }
    else {
        console.log("Database Connection Failed");
    }
});

app.get("/getaddress/:user/:name", async (req, res) => {
    const name = req.params.name;
    const userName = req.params.user;
    if(db) {
        const result = await db.collection(`SavedAddresses-${userName}`).find({Name : name}).toArray();
        res.send(result);
    }
    else {
        console.log("Database Connection Failed");
    }
});

app.delete("/delete/:user/:id", async (req, res) => {
    const addId = req.params.id;
    const userName = req.params.user;
    if(db) {
        const result = await db.collection(`SavedAddresses-${userName}`).deleteOne({_id : new ObjectId(addId)});
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Item deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    else {
        console.log("Database connection failed");
    }
});

const port = process.env.PORT || 4001;
const host = '0.0.0.0';

app.listen(port, host);
console.log(`Server Running : ${port}`);
