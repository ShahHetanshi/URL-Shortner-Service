const express = require('express');
const bodyParser = require('body-parser'); 
const urlRoutes = require('./routes/url'); 

const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use('/url', urlRoutes); 

app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
