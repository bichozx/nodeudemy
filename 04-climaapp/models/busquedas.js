const fs = require('fs');

const axios = require('axios').default;




class Busquedas {

    historial = [];
    dbPath = '.db/database.json';

    constructor() {
        // Todo: leer DB si existe
        this.leerDB();
    }

    get paramsMpbox() {

        return {

            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {

        //peticion
        //console.log('ciudad', lugar);
        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}m.json`,
                params: this.paramsMpbox
            });
            const resp = await intance.get();
            return resp.data.features.map(lugar => ({

                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            }));



            return []

        } catch (error) {

            return [];

        }


    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }



    async climaLugar(lat, lon) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }

    }

    agregarHistorial(lugar = '') {

        //prevenir duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) {

            return
        }


        this.historial.unshift(lugar);

        //Grabar en DB
        this.guardarDB


    }

    guardarDB() {

        const payload = {

            historial: this.historial
        }

        fs.writeFile(this.dbPath, JSON.stringify(payload));
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ')

        })
    }

    leerDB() {

        //Debe de existir

        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;


    }


}

module.exports = Busquedas;