
lista_usuarios();
function lista_usuarios(valor,pagina){
	var pagina=Number(pagina);
	$.ajax({
		url:'../controller/usuarios/controller_lista_usuarios.php',
		type:'POST',
		data:'valor='+valor+'&pagina='+pagina+'&boton=buscar'
	}).done(function(resp){
		
		var d=resp.split("*");
		//Imprimimos los registro en nuestra Table
		var valores = eval(d[0]);

		html="<table class='table table-bordered table-hover table-striped'><thead><tr class='success'><th>Código</th><th>Tipo Usuario</th><th>Descripción</th><th>Usuario</th><th>Contraseña</th><th>Email</th><th>Estado</th><th>Operación</th></tr></thead><tbody>";
		for(i=0;i<valores.length;i++){
			datos=valores[i][0]+"*"+valores[i][1]+"*"+valores[i][2]+"*"+valores[i][3]+"*"+valores[i][4]+"*"+valores[i][5]+"*"+valores[i][6];
			html+="<tr><td>"+valores[i][0]+"</td><td>"+valores[i][1]+"</td><td>"+valores[i][2]+"</td><td>"+valores[i][3]+"</td><td>"+valores[i][4]+"</td><td>"+valores[i][5]+"</td><td>"+valores[i][6]+"</td><td><div class='btn-group'> <button type='button' class='btn btn-primary'>Acción <span class='glyphicon glyphicon-cog'></span></button> <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'> <span class='caret'></span></button> <ul class='dropdown-menu' role='menu'> <li><a href='#' data-toggle='modal' data-target='#myModal_modificar' onclick='mostrar_usuarios("+'"'+datos+'"'+");'>Modificar</a></li> <li class='divider'></li> <li><a href='#' data-toggle='modal' data-target='#myModal_eliminar'  onclick='eliminar_cliente("+'"'+datos+'"'+");'  >Eliminar</a></li> </ul> </div></td></tr>";
		}
		html+="</tbody></table>"
		$("#lista").html(html);

		var totalreg= d[1];
		var nropaginador=Math.ceil(totalreg/5);
		var campobuscar=$("#buscarusuarios").val();
		///numero de paginas en un alert
		//alert(nropaginador);
		paginar="<ul class='pagination'>";
		if(pagina>1)
		{
			paginar+="<li><a href='javascript:void(0)' onclick='lista_usuarios("+'"'+campobuscar+'","'+1+'"'+")'>&laquo;</a></li>";
			paginar+="<li><a href='javascript:void(0)' onclick='lista_usuarios("+'"'+campobuscar+'","'+(pagina-1)+'"'+")'>&lsaquo;</a></li>";

		}
		else
		{
			paginar+="<li class='disabled'><a href='javascript:void(0)'>&laquo;</a></li>";
			paginar+="<li class='disabled'><a href='javascript:void(0)'>&lsaquo;</a></li>";
		}

		
		
			limite = 10;
 

			div = Math.ceil(limite / 2);

			pagInicio = (pagina > div) ? (pagina - div) : 1;

			if (nropaginador > div)
			{
				pagRestantes = nropaginador - pagina;
				pagFin = (pagRestantes > div) ? (pagina + div) :nropaginador;
			}
			else 
			{
				pagFin = nropaginador;
			}
			for(i=pagInicio;i<=pagFin;i++){
				if(i==pagina)
					paginar+="<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>";
				else
					paginar+="<li><a href='javascript:void(0)' onclick='lista_usuarios("+'"'+campobuscar+'","'+i+'"'+")'>"+i+"</a></li>";
			}
		
		

		if(pagina<nropaginador)
		{
			paginar+="<li><a href='javascript:void(0)' onclick='lista_usuarios("+'"'+campobuscar+'","'+(pagina+1)+'"'+")'>&rsaquo;</a></li>";
			paginar+="<li><a href='javascript:void(0)' onclick='lista_usuarios("+'"'+campobuscar+'","'+nropaginador+'"'+")'>&raquo;</a></li>";

		}
		else
		{
			paginar+="<li class='disabled'><a href='javascript:void(0)'>&rsaquo;</a></li>";
			paginar+="<li class='disabled'><a href='javascript:void(0)'>&raquo;</a></li>";
		}
		paginar+="</ul>";
		$("#paginador").html(paginar);
		
	});
}



function eliminar_cliente(datos){
	var d2=datos.split("*");
	var id_usuarioe = d2[0];
	$("#id_usuarioe").val(d2[0]);
	$("#nombreuser").text(d2[2]+" "+d2[3]);


}



function mostrar_usuarios(datos){
	//alert(datos);
	var d=datos.split("*");
	//alert(d.length);


	$("#id_user2").val(d[0]);
	$("#id_tipouser2").val(d[1]);
	$("#id_nomtipo").val(d[2]);
	$("#nombre2").val(d[3]);
	$("#clave2").val(d[4]);
	$("#email2").val(d[5]);
	$("#estado2").val(d[6]);

}