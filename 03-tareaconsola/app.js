// solo era un ejemplo => const { mostrarMenu, pausa } = require('./mensajes');

const { guardarDB, leerDB } = require('./guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarlistadoCheckList
} = require('./inquirer');



const Tareas = require('./models/tareas');

require('colors');
console.clear();

const main = async() => {

    //console.log('hola mundo');

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();


    if (tareasDB) {

        //establecer las tareas
        //Todo: cargar tareas

        tareas.cargarTareasFromArray(tareasDB);


    }
    //await pausa();





    do {
        // imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);

                break;

            case '2':
                tareas.listadoCompleto();

                break;

            case '3':
                tareas.listarPendientesCompletadas(true);

                break;

            case '4':
                tareas.listarPendientesCompletadas(false);

                break;

            case '5':
                const ids = await mostrarlistadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                //console.log(ids);

                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                //confirmacion
                if (id !== '0') {

                    const ok = await confirmar('Esta seguro que de sea elimar la tarea')
                    if (ok) {

                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }

                }

                console.log({ id })

                break;

            default:
                break;

        }

        //guarda en la base de datos
        guardarDB(tareas.listadoArr);

        //console.log({ opt });

        //if (opt !== '0') 




        console.log('\n')

        await pausa();

    } while (opt !== '0');

    //mostrarMenu();
    //pausa();

}

main();