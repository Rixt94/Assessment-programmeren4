const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ApiError = require('./model/ApiError');
const config = require('./config/config');

const port = process.env.PORT || config.webPort;

let app = express();

// bodyParser zorgt dat we de body uit een request kunnen gebruiken
app.use(bodyParser.json());

// Installeer Morgan als logger
app.use(morgan('dev'));

app.use('*', function(req, res, next){
  next();
});

app.use('/api', require('./routes/studentenhuis_routes'));
app.use('/api', require('./routes/authentication_routes'));
app.use('/api', require('./routes/deelnemers_routes'));
app.use('/api', require('./routes/maaltijd_routes'));

app.get('/test', function (req, res, next) {
  console.log("test");
  res.status(200).end();
});

app.use('*', (req, res, next) => {
  console.log('This endpoint does not exsist');
  next("Deze endpoint bestaat niet");
});

app.use((err, req, res, next) => {
  console.log('Catch-all error handler was called.');
  console.log(err.toString());

  // const error = new ApiError(err.toString(), 404);

  // res.status(404).json(error).end();
  res.status(404).json(err.toString()).end();
});

app.listen(port, () => {
  //log the actual active port, not some static number
  console.log('De server luistert op port ' + port); 
});

module.exports = app;