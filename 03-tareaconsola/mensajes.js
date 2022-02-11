const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('============================='.blue);
        console.log('=                           ='.blue);
        console.log(`${'='.blue}  ${'SELECCIONA UNA OPCION'.green }    ${'='.blue}`);
        console.log('=                           ='.blue);
        console.log('=============================\n'.blue);

        console.log(`${'1'.blue}. Crear Tareas`);
        console.log(`${'2'.blue}. Listar Tareas`);
        console.log(`${'3'.blue}. Liatar Tareas Completadas`);
        console.log(`${'4'.blue}. Listar Tareas Pendientes`);
        console.log(`${'5'.blue}. Completar Tareas`);
        console.log(`${'6'.blue}. Borrar Tarea`);
        console.log(`${'0'.blue}. Salir \n`);

        const readline = require('readline').createInterface({

            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ', (opt) => {

            // ya se  configuro en la pausa console.log({ opt });
            readline.close();
            resolve(opt);
        })



    });

    /*console.clear();
    console.log('============================='.blue);
    console.log('=                           ='.blue);
    console.log(`${'='.blue}  ${'SELECCIONA UNA OPCION'.green }    ${'='.blue}`);
    console.log('=                           ='.blue);
    console.log('=============================\n'.blue);

    console.log(`${'1'.blue}. Crear Tareas`);
    console.log(`${'2'.blue}. Listar Tareas`);
    console.log(`${'3'.blue}. Liatar Tareas Completadas`);
    console.log(`${'4'.blue}. Listar Tareas Pendientes`);
    console.log(`${'5'.blue}. Completar Tareas`);
    console.log(`${'6'.blue}. Borrar Tarea`);
    console.log(`${'0'.blue}. Salir \n`);

    const readline = require('readline').createInterface({

        input: process.stdin,
        output: process.stdout
    });

    readline.question('Seleccione una opcion: ', (opt) => {

        // ya se  configuro en la pausa console.log({ opt });
        readline.close();
    })*/

}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({

            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'ENTER'.green} Para Continuar\n`, (opt) => {

            console.log({ opt });
            readline.close();
            resolve(opt);
        })
    })

    /*const readline = require('readline').createInterface({

        input: process.stdin,
        output: process.stdout
    });

    readline.question(`\nPresione ${'ENTER'.green} Para Continuar\n`, (opt) => {

        console.log({ opt });
        readline.close();
    })*/

}

module.exports = {
    mostrarMenu,
    pausa

}