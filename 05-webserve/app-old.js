const http = require('http');

http.createServer((req, res) => {

        res.write('Hola idioto');
        res.end();

    })
    .listen(9090);

console.log('te oigo en 1616')