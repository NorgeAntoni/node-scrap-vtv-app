const { inquirerMenu, leerInput, pausa } = require("./helpers/inquirer");
const respuestas = require("./helpers/respuestas");
const Busquedas = require("./models/busquedas")

const main = async ()=>{

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const dominio = await leerInput('Dominio: ');
                if(!dominio){
                    console.log('Debe introducir un dominio');
                    await pausa();
                    continue;
                }
                let year = await leerInput('Year: ');
                let km = await leerInput('Kilometraje: ');

                if (!year) year = (await busquedas.buscarYearByDominio( dominio )).year;
                if(!km) km = 1;
                if(km === '60000' ) km ++;

                const auto = await busquedas.vehiculo( dominio, year, km);
                const resp = await respuestas(auto);
                console.log(resp);
                break;
        }
        if (opt !== 0) await pausa();      
    } while (opt !== 0);
}

main();