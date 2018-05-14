const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

let app = express()

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
app.use(bodyParser.json());

// Installeer Morgan als logger
app.use(morgan('dev'));

app.use('*', function(req, res, next){
    next()
})


app.use('*', function (req, res, next) {
    console.log('De endpoint die je zocht bestaat niet')
    next("Deze endpoint bestaat niet")
})

app.use((err, req, res, next) => {
    console.log('Catch-all error handler was called.')
    console.log(err.toString())

    const error = new ApiError(err.toString(), 404)

    res.status(404).json(error).end()
})

app.listen(port, function () {
    console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app;