const express = require('express')
const app = express()
app.engine('html', require('hbs').__express);

const hbs = require('hbs');

const port = 1616;



//servicio statico
app.use(express.static('public'))

app.get('/generic', (req, res) => {
    res.sendFile(__dirname + 'public/generic.html')
})

app.get('/elements', (req, res) => {
    res.sendFile(__dirname + 'public/elements.html')
})




app.get('/', function(req, res) {
    res.send('Home page')
});

app.get('/hola-mundo', function(req, res) {

    res.setDefaultEncoding('Hola mundo  soy un tilin')
});

app.listen(port, () => {
    console.log(`escuchando en el http://localhost:${port}`)
})