const express = require ("express");
const request = require ("request");
require('dotenv').config();
const https = require ("https");
const app = express();
const path = require ("path");
const PORT = process.env.PORT || 5000 ;

//middleware
app.use(express.json());
app.use(express.static("/public")); // to render static file like CSS, plain javascript, fonts, images.
app.use(express.static(path.join(__dirname, './public')));
// app.use(bodyParser.urlencoded({extended:true}));

//routes
app.get("/", function(req, res){
 res.sendFile(__dirname +"/index.html");
 // console.log("helo");
});

app.post("/",function(req,res){
let name = req.body.name;
let email = req.body.email;
console.log(req.body)

 // console.log (fname,lname,email);

 let data = {    // a data object in JSON format
  members:[      // datatype array as requested by mailchimp
   {
    email_address: email,   // datatype string
    status: "subscribed",    // datatype string
    merge_fields: {          // datatype Object
     FNAME : name,
    }
   }
  ]
 };

 // converting the data object to a flatpack JSON using stringify() method for posting to mailchimp
 var  JsonData = JSON.stringify(data);

 // the parameters for the https.request() method from Node.js
const url = "https://us11.api.mailchimp.com/3.0/lists/223107ea8e" ; // the mailchimp server url
//https://us11.api.mailchimp.com/3.0/lists/223107ea8e

const options = {
 method : "POST",
 headers: {
    Authorization: process.env.API_KEY
 } // mailchimp API key
}

 const request = https.request(url,options, function(response){

  if (response.statusCode === 200){
//    res.sendFile(__dirname+"/success.html");
    res.send({message:"OK"})
  } else {
   res.send({message:"error"});
  }

  response.on("data", function(data){
//   console.log(JSON.parse(data));
 });
 })
  // this sends the JsonData to the mailchimp server
 request.write(JsonData);
 request.end(); // this specifies that the request.write is done writing data to the mailchimp server

});

// a failure route to redirect to the home route
app.post("/failure", function(req,res){
 res.redirect("/");
})

// a success route to redirect to the home route
app.post("/success", function(req,res){
 res.redirect("/");
})

app.listen(PORT,()=>{ return console.log(`Server is listening on port: ${PORT}`)});