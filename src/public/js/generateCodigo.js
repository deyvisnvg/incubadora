const disp1 = document.getElementById('idProducto');

var id;

(function generateID() {
    id = + new Date() + Math.floor(Math.random() * 1000);
})()

disp1.value = "Product_" + id;

console.log("Product_" + id);

// JavaScript almacena las fechas como número de milisegundos desde 
// el 1 de enero de 1970 a las 00:00:00 UTC (hora universal coordinada).