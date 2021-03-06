
/*El tipo de contenido correcto para el archivo de Excel es la secuencia de octetos, por lo que 
deberá convertir los datos binarios en octetos. Podemos lograr eso usando arrayBuffer, UInt8Array 
y una operación de bits como ésta.*/
function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

socketio.on("data", info => {
    saveAs(new Blob([s2ab(info.wbout)],{type:"application/octet-stream"}), info.filePath);
})


