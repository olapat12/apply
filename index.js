const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer")
const mongoose = require('mongoose')
require('dotenv').config();
var cors = require('cors')
const path = require('path');
const User = require('./model/user')

var PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://khalifa:tech10@cluster0.nbcuv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ useNewUrlParser: true },
()=> console.log('connected to db'))

app.engine('handlebars', exphbs())

app.set('view engine', 'handlebars')

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('hello')
});

app.post('/car', async(req, res)=>{

  const user = new User({
    name: req.body.name
  });

  try {
    const savedUser = await user.save();  
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/send', (req, res)=>{

    const output = `
    <p>Welcome to Bigboy Apparrel</P>
    <p>Email: ${req.body.email} </p>
    <p>Username: ${req.body.username}</p>
    <p>orderid: ${req.body.orderid}</p>
    `

        let transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            // port: 587,
            // service: 'gmail',
            // secure: false, // true for 465, false for other ports
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
              user: "pcurtis2500@gmail.com", // generated ethereal user
              pass: "mymumis20", // generated ethereal password
            },
            // tls:{
            //     rejectUnauthorized: false
            // }
          });
        
          const mailoptions = {
            from: 'pcurtis2500@gmail.com', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Thank you for joining", // Subject line
            text: "Thank you for registering with us!!!", // plain text body
            html: output
          }
          // send mail with defined transport object

           transporter.sendMail(mailoptions, (error, info)=>{
            if(error){
                console.log(error)
            }
            else{
                var successRes = { "status": "success" }
                res.status(200).send(successRes);
            }
        })

    });

    app.post('/register', (req, res)=>{

        const output = `
        <p>Welcome to Bigboy Apparrel</P>
        <p>Thank you for registering with us</p>
        <p>Email: ${req.body.email} </p>
        <p>Username: ${req.body.username}</p>
        `
    
            let transporter = nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 587,
                // service: 'gmail',
                // secure: false, // true for 465, false for other ports
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, 
                auth: {
                  user: "pcurtis2500@gmail.com", // generated ethereal user
                  pass: "mymumis20", // generated ethereal password
                },
                // tls:{
                //     rejectUnauthorized: false
                // }
              });
            
              const mailoptions = {
                from: 'pcurtis2500@gmail.com', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Thank you for registering with us!!!", // plain text body
                html: output
              }
              // send mail with defined transport object
    
               transporter.sendMail(mailoptions, (error, info)=>{
                if(error){
                    console.log(error)
                }
                else{
                    var successRes = { "status": "success" }
                    res.status(200).send(successRes);
                }
            })
    
        });


app.listen(PORT, ()=> console.log("server started"));