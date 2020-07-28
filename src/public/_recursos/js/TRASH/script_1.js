$(document).on("ready",inicio);

function inicio(){
	$("#btn_login").click(function(){
		var usuario = $("#txt_usuario").val();
		var password = $("#txt_password").val();
		ComprobarLogin(usuario,password);
	});
}

function ComprobarLogin(usuario,password){
	$.ajax({
	url:"http://localhost:3000/sistema_evento/model/usuarios/modelo_usuario_consultar.php",
	type:"POST", 
	data:{
		usuario:usuario,
		password:password
	},
	success:function(respuesta){
		console.log(respuesta);
	}
	});
}