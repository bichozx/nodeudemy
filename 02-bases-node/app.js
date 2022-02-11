const argv = require('yargs').argv;
const colors = require('colors').colors;


console.log(process.argv)
console.log(argv);
//console.log(colors)




let base = 6;

for (let i = 1; i <= 10; i++) {

    console.log(`${base}  ${'X'.rainbow}  ${i} = ${i*base}`);

}