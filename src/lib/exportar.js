const xlsx = require('xlsx');
const path = require('path');
const { socket } = require('../socket');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    let info = {};
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData); // creamos una hoja, pasandole como parámetro las columnas y data
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    //xlsx.writeFile(workBook, path.resolve(filePath)); //
    
    /*Necesitamos exportar el libro de trabajo como binario xlsx.*/
    var wbout = xlsx.write(workBook, { bookType: 'xlsx' , type: 'binary' }); //path.resolve(filePath)
    
    info = {
        wbout,
        filePath
    }

    socket.io.emit("data", info);
}

module.exports = exportExcel;