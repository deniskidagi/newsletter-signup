const express = require("express")
const bodyParser = require("body-parser")
//const mongoose = require("mongoose")
const https = require('https')

const app = express()


//app.set("view-engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + '/signup.html')
})
app.post('/', function(req, res){
    const fname = req.body.firstname
    const lname =  req.body.lastname
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    const url =  "https://us5.api.mailchimp.com/3.0/lists/ddd2b0298b"


    const options = {
        method: "POST",
        auth: "denis:fb51cac265c71b81038071f86d33615a-us5"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()

})

app.post('/failure', function(req, res){
    res.redirect("/signup")
})

app.listen(3000, function(req, res){
    console.log("server listening on port 3000");
})
 
