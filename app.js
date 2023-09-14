const autosImportados=require("./autos.json")
//console.log(autosImportados);
const personas= require("./personas.json")

const concesionaria = {
    
    autos: autosImportados,
    buscarAuto: function (patente) {
        /*return this.autos.find(auto => auto.patente=== patente) || null*/
        let buscar=this.autos.find(auto => auto.patente=== patente)
        return buscar? buscar: null //si existe lo que estamos buscando retorname lo que estamos buscando sino null
        
    },
    venderAuto: function (patente) {
        let autos= this.buscarAuto(patente)
        if(autos){
            autos.vendido= true
        }
        return autos || "auto no encontrado"
    },
    autosParaLaVenta: function () {
        let autosv= this.autos.filter(auto => auto.vendido=== false )
        return autosv
    },
    autosNuevos: function () {
        let autosn= this.autosParaLaVenta()
        return autosn.filter(auto=> auto.km < 100)

        
    },
    listaDeVentas: function () {
        let autoPrecio= this.autos.filter(auto => auto.vendido)
        return autoPrecio.map(auto => auto.precio)
    },
    totalDeVentas: function () {
        
        return this.listaDeVentas().reduce(function (acum , num){
            return acum + num
        },0)
        
    },
    puedeComprar: function (auto,persona) {
        return auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas
    },
    autosQuePuedeComprar: function (persona) {
        return this.autosParaLaVenta().filter(auto =>this.puedeComprar(auto, persona)) 
    }

};

console.log(concesionaria.puedeComprar(autosImportados[1],personas[1]));