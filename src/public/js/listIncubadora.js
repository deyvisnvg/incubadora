// let task = document.getElementById('task');

$(function () {
    $('.stated').each(function (indice, valor) { // Recorro cada clase '.iconzoom' de mi tabla de datos

        console.log(indice, valor)
        const texto = $(`.stated:eq(${indice}) div`).text()
        console.log(texto)

        if (texto == 'Activo') {
            $(`.stated:eq(${indice})`).css({"color":"#138d0c"});
        } else {
            $(`.stated:eq(${indice})`).css({"color":"#f44336fa"});
        }

    });
})



// $(function () {
//     $('.task').each(function (indice, valor) {
//         if ($(valor).val() == 'Activado') {
//             $(`[id=task]:eq(${indice})`).css({"color":"white", "background":"#0da82f"});
//         } else {
//             $(`[id=task]:eq(${indice})`).css({"color":"white", "background":"#e93119"});
//         }

//     });

// })



// =======================================================================================

// =======================================================================================

// =======================================================================================
{/* <input type="text" class="task" name="task[]" /> */ }

// $('.task').each(function(){
//     alert($(this).val());
//  });
// ========================================================================================

// ========================================================================================
{/* <input type="text" name="task[]" class="form-control" id="task"></input> */ }

// otra forma
// ----------------------------------------
// var tasks= new Array();
// $('input[name^="task"]').each(function() 
// {
// tasks.Push($(this).val());
// });

// otra forma
// -------------------------------------
// $("[id=task]:eq(0)").val();
// $("[id=task]:eq(1)").val();
// ========================================================================================

// ========================================================================================
{/* <p id="parrafo" style="color:#FF0040;">Esto es un párrafo de texto de color rojo.</p>
<p><input type="button" id="boton" value="Clicka para cambiar la propiedad"></p> */}

// $(document).ready(function(){
//     $("#boton").on("click",function(){
// 	    $("#parrafo").css("color", "#000000");
//     });
// });
// ========================================================================================


