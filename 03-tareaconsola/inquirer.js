const inquirer = require('inquirer');
const Tarea = require('./models/tarea');
require('colors');

const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: `${'¿Que deseas hacer?'.green}`,
        choices: [{
                value: '1',
                name: `${'1'.green}. Crear Tarea`

            },

            {
                value: '2',
                name: `${'2'.green}. Listar Tarea`

            },

            {
                value: '3',
                name: `${'3'.green}. Listar Tareas Completas`

            },

            {
                value: '4',
                name: `${'4'.green}. Listar Tareas Pendientes`
            },

            {
                value: '5',
                name: `${'5'.green}. Completar Tarea(s)`
            },

            {
                value: '6',
                name: `${'6'.green}. Borrar Tarea`
            },

            {
                value: '0',
                name: `${'0'.green}. Salir`
            },




        ]
    }
];

const pausa = async() => {

    const question = [{

        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} Para Continuar`
    }]

    await inquirer.prompt(question);
}


const inquirerMenu = async() => {


    console.clear();
    console.log('============================='.blue);
    console.log('=                           ='.blue);
    console.log(`${'='.blue}  ${'SELECCIONA UNA OPCION'.green }    ${'='.blue}`);
    console.log('=                           ='.blue);
    console.log('=============================\n'.blue);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;


}

const leerInput = async(message) => {

    const question = [{

        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {

                return 'por favor ingrese una tarea'
            }

            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc
}

const listadoTareasBorrar = async(tareas = []) => {

    console.log();

    const choices = tareas.map((tarea, i) => {

        const idx = `${i+1}`.green;

        return {

            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({

        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [{

        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const { id } = await inquirer.prompt(preguntas)

    return id;


}

const confirmar = async(message) => {

    const question = [{

        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;


}


const mostrarlistadoCheckList = async(tareas = []) => {

    console.log();

    const choices = tareas.map((tarea, i) => {

        const idx = `${i+1}`.green;

        return {

            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })


    const preguntas = [{

        type: 'checkbox',
        name: 'ids',
        message: 'Selecione',
        choices
    }]

    const { ids } = await inquirer.prompt(preguntas)

    return ids;


}



module.exports = {

    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarlistadoCheckList

}