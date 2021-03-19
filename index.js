const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path: './.env'});

app.listen(5000, () => console.log("Listening at 7000"));
app.set("view-engine", 'ejs');
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: false}));

app.use(express.static('public/LandingPage'));