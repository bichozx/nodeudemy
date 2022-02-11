const { leerInput, inquirerMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('dotenv').config()





const main = async() => {

    console.clear();
    //const texto = await leerInput('loca: ');


    const busquedas = new Busquedas();
    let opt = '';



    do {
        opt = await inquirerMenu();
        //console.log({ opt });

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //Mostrar lugares
                const lugares = await busquedas.ciudad(termino);

                //seleccion el lugar
                const id = await listadoLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);

                if (id === '0') continue;

                //guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);


                //console.log(lugarSel);

                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //console.log(clima);


                //Mostrar resultado
                console.clear();

                console.log('\n Informacion de la Ciudad \n'.cyan);
                console.log('Ciudad: ', lugarSel.nombre.cyan)
                console.log('Lat: ', `${lugarSel.lat}`.cyan)
                console.log('Lng: ', `${lugarSel.lng}`.cyan)
                console.log('Temperatura: ', `${clima.temp}`.cyan)
                console.log('Maxima: ', `${clima.max}`.cyan)
                console.log('Minima: ', `${clima.min}`.cyan)
                console.log('como esta el clima: ', `${clima.desc}`.cyan)

                console.log();

                break;

            case 2:
                console.log();

                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i +1}`.cyan
                    console.log(`${idx} ${lugar}`);


                })

                console.log();

                break;

            case 0:

                break;

            default:
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);







}


main();