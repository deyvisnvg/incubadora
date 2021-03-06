// let contador = 0;
// let t, h;
// let memoria = 10;
// let memoria2 =5;
let datas = [];
// let temperatura, humedad;

setInterval(() => {
    proTemp = parseInt(proTemp,10) //Obtengo esta data de monitoreo.js
    proHum = parseInt(proHum,10)
    // memoria = memoria;
    // t = memoria
    // h = memoria2

    // memoria += 3;
    // memoria2 += 4;
    // contador += 1;

    // if (t > 10) {
    //     t -= 4;
    //     h -= 4;
    // }

    // console.log("t: "+t, "h: "+h, "contador"+contador);

    value = [new Date(), proTemp, proHum];
    datas.push(value);
    drawCurveTypes();
}, 2000);


google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
      let data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Temperatura');
      data.addColumn('number', 'Humedad');

      data.addRows(datas);

      let options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Promedio %'
        },
        series: {
          1: {curveType: 'function'}
        }
      };

      //let chart = new google.visualization.LineChart(document.getElementsByClassName('chart_div'));
      let chart;

      $(function () {
        $('.chart_div').each(function (indice, valor) { // Recorro cada clase '.iconzoom' de mi tabla de datos
            const cod = $(`.chart_div:eq(${indice}) div`).text();
            console.log(cod);
            //var detalle = document.querySelector(`.chart_div${cod}`);
            chart = new google.visualization.LineChart(document.querySelector(`.show${cod}`));
            chart.draw(data, options);
        });
    })


      
    }