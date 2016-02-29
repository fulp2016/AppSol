var employees;

/*
$('#appsolListPage').bind('pageinit', function(event) {
	getDestacadosList();
});*/

/* function getYouTubeInfo(ruta) {
 
						$.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+v+"&key=AIzaSyCRFtBQ4pANIXYaZapjjnaHNIeOVzPKwqY&part=snippet", function(data) {
					$.each(data.items, function(index, video) {
						 var id = video.id;
						 var title = video.snippet.title;
						 $('#destacadosList').append('<a href="https://www.youtube.com/watch?v=' + id + '"><li>' +
						'<img src="img/ico-youtube.png"> '+
						'<h4>' + title + '</h4>' +
						'</li></a>');
					});
				});			
        }*/

function getDestacadosList() {
	var serviceDestacadosURL = "http://www.fulp.es/servicesfulp/ofertas.json?regId="+regId;
	
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList a').remove();
		employees = data;
		var i=0;
		var m=0;
		$.each(employees, function(index, destacado) {
		var imagen='';		var descripcion = '';		var imgfav= '';		var fav = destacado.favorito;  var funfav= '';
		
			if(destacado.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = '<a href="' +destacado.enlace+ '">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="https://i.ytimg.com/vi/V5AB4nrL-8o/maxresdefault.jpg"></div>';		
			}
			else if(destacado.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace =  '<a href="' +destacado.enlace+ '">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			else if(destacado.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace = '<a onclick="getDetalleTerraza('+destacado.id +');">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="http://www.fulp.es/FULP/terraza/imagenes/'+destacado.id+'.jpg"></div>';
			}
			else if(destacado.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			else if((destacado.tipo=='B')||(destacado.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			
			if(fav=='N')
			{
				imgfav='img/strellaoff.png';
				funfav= 'anadir_favorito(\''+destacado.tipo+'\',\''+destacado.id+'\',\''+ m +'\')';
			}
			else
			{
				imgfav='img/strellaon.png';
				funfav= 'eliminar_fav(\''+destacado.tipo+'\',\''+destacado.id+'\',\''+ m +'\')';
			}

			$('#destacadosList').append( '<a id="enlcfavorito'+ m +'" onclick="'+funfav+'"><img class="icofavorito" id="icofavorito'+ m +'" src="'+ imgfav +'"></a>'+
				enlace + '<li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + destacado.titulo + '</h4>' +
				descripcion + '</div>'+
				imagen +
				'</li></a>');
			m=m+1;
		});
		$('#destacadosList').listview('refresh');
		//$('#destacadosList').load();
	});
mostrarDestacados();	
}

function getFavoritosList() {
	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/favoritos.json?regId="+regId;
	
	$.getJSON(serviceFavoritoURL, function(data) {
		$('#favoritosList a').remove();
		employees = data;
		var i=0;
		var m=0;
		$.each(employees, function(index, favorito) {
		var imagen='';		var descripcion = '';		var imgfav= '';		var fav = favorito.favorito;  var funfav= '';
		
			if(favorito.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = '<a href="' +favorito.enlace+ '">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="https://i.ytimg.com/vi/V5AB4nrL-8o/maxresdefault.jpg"></div>';		
			}
			else if(favorito.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace =  '<a href="' +favorito.enlace+ '">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			else if(favorito.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace = '<a onclick="getDetalleTerraza('+favorito.id +');">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="http://www.fulp.es/FULP/terraza/imagenes/'+favorito.id+'.jpg"></div>';
			}
			else if(favorito.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+favorito.id +');">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			else if((favorito.tipo=='B')||(favorito.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+favorito.id +');">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			
			if(fav=='N')
			{
				imgfav='img/strellaoff.png';
				funfav= 'anadir_favorito(\''+favorito.tipo+'\',\''+favorito.id+'\',\''+ m +'\')';
			}
			else
			{
				imgfav='img/strellaon.png';
				funfav= 'eliminar_fav2(\''+favorito.tipo+'\',\''+favorito.id+'\',\''+ m +'\')';
			}

			$('#favoritosList').append( '<a id="enlcfavorito'+ m +'" onclick="'+funfav+'"><img class="icofavorito" id="icofavorito'+ m +'" src="'+ imgfav +'"></a>'+
				enlace + '<li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + favorito.titulo + '</h4>' +
				descripcion + '</div>'+
				imagen +
				'</li></a>');
			m=m+1;
		});
		$('#favoritosList').listview('refresh');
		//$('#favoritosList').load();
	});
mostrarFavoritos();	
}

function getCitaForm() {
	
	mostrarCita();
}


function getAvisosList() {
	
	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/avisos.json?regId="+regId;
	
	$.getJSON(serviceFavoritoURL, function(data) {
		$('#avisosList li').remove();
		employees = data;
		var i=0;
		$.each(employees, function(index, aviso) {
			var clase='';
			if(aviso.visto=='N'){clase = 'nuevo';}
			$('#avisosList').append( '<li class="'+ clase +'">' +
				'<div class="imagn"><img src="img/ico-beca.png"></div> '+
				'<div class="contn">' +
				'<p>'+aviso.aviso + '</p>'+ 
				'</div>'+
				'</li>');
		});
		$('#avisosList').listview('refresh');
	});
	mostrarAvisos();
}

function getDetalleOferta(id) { 
	
	mostrarDetalle();
	$('#titulo').empty();
	$('#dgenerales').empty();
	$('#descripcion').empty();
	var serviceURL2 = "http://www.fulp.es/servicesfulp/oferta.json?id="+id;
	$.getJSON(serviceURL2, function(data) {

		//$.each(data, function(index, oferta) {
			$('#titulo').append('<h4>'+data.asunto+'</h4><p>' + data.entidad + '</p>');
			
			var contrato = ''; var jornada = ''; var salario = '';
			if ((data.contrato)&&(data.contrato!='No especificado')) {
				contrato ='<p><strong>Contrato:</strong> ' + data.contrato + '</p>';
			}
			if ((data.jornada)&&(data.jornada!='No especificado')) {
				jornada ='<p><strong>Jornada:</strong> ' + data.jornada + '</p>';
			}
			if ((data.salario)&&(data.salario!='No especificado')) {
				salario ='<p><strong>Salario:</strong> ' + data.salario + '</p>';
			}
			
			$('#dgenerales').append(contrato + jornada + salario);
			
			$('#descripcion').append("<h5>Descripci&oacute;n</h5><p>"+data.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</p>");
			
			$("#enloferta").attr("href","http://www.fulp.es/oferta/"+data.enlace);
			
			
		//});
		//$('#actionList').listview('refresh');
	});
}

function getDetalleTerraza(id) { 
	
	mostrarTerraza();
	$('#tituloT').empty();
	$('#dgeneralesT').empty();
	$('#descripcionT').empty();
	var serviceURL2 = "http://www.fulp.es/servicesfulp/terraza.json?id="+id;
	$.getJSON(serviceURL2, function(data) {
	
			$('#tituloT').append('<h4>'+data.titulo+'</h4>');
			
			$("#imgterraza").attr("src","http://www.fulp.es/FULP/terraza/imagenes/"+data.id+".jpg");
			
			$('#descripcionT').append("<h5>Descripci&oacute;n</h5><p>"+data.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</p>");
			
			$("#enlterraza").attr("href","http://www.fulp.es/evento/"+data.enlace);

		//$('#actionList').listview('refresh');
	});
}

function getItinerarioList() {
	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/itinerario.json?cod_personal=2262";
	
	$.getJSON(serviceFavoritoURL, function(data) {
		$('#itinerarioList li').remove();
		employees = data;
		var i=0;
		$.each(employees, function(index, itinerario) {
		var icoiti='';
			if(itinerario.tipo == 'T') {icoiti='img/ico_tutoria.png';}
			else if(itinerario.tipo == 'C') {icoiti='img/ico_curso.png';}
			$('#itinerarioList').append( '<li>' +
				'<div class="imagn"><img src="'+icoiti+'"></div> '+
				'<div class="contn"><h4>' + itinerario.nombre_accion + '</h4>' +
				'<p>Del '+itinerario.fecha_inicio + ' al '+itinerario.fecha_fin+'</p></div>'+
				'</li>');
		});
		$('#itinerarioList').listview('refresh');
	});
mostrarItinerario();	
}

function getSesionForm() {
alert('entra2');
	if((cod_personal!='')&&(cod_personal!='0'))
	{
	alert('entra3');
		cerrar_sesion();
		cod_personal = '';
		$("#meniniciar").attr("onClick","getSesionForm();");
		alert('Sesión cerrada correctamente');
	}
	mostrarSesion();
}

function mostrarDestacados()
{
  //$('#apptitle').text('Destacados');
  $("#imgcab").attr("src","img/cab_descatado.png");
  $('#contenedorDestacados').show();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}

function mostrarFavoritos()
{
  //$('#apptitle').text('Destacados');
  $("#imgcab").attr("src","img/cab_favorito.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').show();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}


function mostrarCita()
{
 // $('#apptitle').text('Solicitar Cita');
  $("#imgcab").attr("src","img/cab_cita.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').show();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}

function mostrarAvisos()
{
  //$('#apptitle').text('Notificaciones/Avisos');
  $("#imgcab").attr("src","img/cab_alertas.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').show();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}


function mostrarSesion()
{
alert('entra');
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_inicio.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').show();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}

function mostrarDetalle()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_oferta.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').show();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
}

function mostrarItinerario()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_itinerario.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').show();
  $('#contenedorTerraza').hide();
}

function mostrarTerraza()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_oferta.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').show();
}

function cerrar_sesion(){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&cerrar=S",false);
	 xmlhttp.send(null);	
	 $("#binicio").attr("src","img/binicio.png");
}

function change(a)
{
	document.getElementById("pagina").value=a;
	document.getElementById('irpagina').submit();
}

function anadir_favorito(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&tipo="+tipo+"&codigo="+codigo+"&newfavorito=S",false);
	 xmlhttp.send(null);	
	 $("#icofavorito"+id).attr("src","img/strellaon.png");
	 $("#enlcfavorito"+id).attr("onclick",'eliminar_fav(\''+tipo+'\',\''+codigo+'\',\''+ id +'\')'); 
}

function eliminar_fav(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&tipo="+tipo+"&codigo="+codigo+"&nofavorito=S",false);
	 xmlhttp.send(null);	
	 $("#icofavorito"+id).attr("src","img/strellaoff.png");
	 $("#enlcfavorito"+id).attr("onclick",'anadir_favorito(\''+tipo+'\',\''+codigo+'\',\''+ id +'\')'); 
	 
}

function eliminar_fav2(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&tipo="+tipo+"&codigo="+codigo+"&nofavorito=S",false);
	 xmlhttp.send(null);	
	 
	 getFavoritosList();
}
