var serviceDestacadosURL = "http://www.fulp.es/servicesfulp/ofertas.json";

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
		
function obtner_idimg(ruta)
{
alert(ruta);
	cadVariables = ruta.substring(1,ruta.length);
	alert(cadVariables);
	arrVariables = cadVariables.split("?");
	alert(arrVariables);
	for (i=0; i<arrVariables.length; i++) {
		arrVariableActual = arrVariables[i].split("=");
		if (isNaN(parseFloat(arrVariableActual[1])))
			eval(arrVariableActual[0]+"='"+unescape(arrVariableActual[1])+"';");
		else
			eval(arrVariableActual[0]+"="+arrVariableActual[1]+";");
		
	alert(arrVariableActual);		
	}
	alert(v);
	return v;
}		


function getDestacadosList() {
	
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList li').remove();
		employees = data;
		var i=0;
		var imagen='';
		$.each(employees, function(index, destacado) {
			if(destacado.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = '<a href="' +destacado.enlace+ '">';
				var idimg = obtner_idimg(destacado.enlace);
				if(idimg)
				{
					imagen = '<img src="https://i.ytimg.com/vi/'+ idimg +'/maxresdefault.jpg">';
					alert(imagen);
				}
			}
			else if(destacado.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace =  '<a href="' +destacado.enlace+ '">';
			}
			else if(destacado.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace =  '<a href="' +destacado.enlace+ '">';
			}
			else if(destacado.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
			}
			else if((destacado.tipo=='B')||(destacado.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
			}
			$('#destacadosList').append( enlace + '<li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + destacado.titulo + '</h4>' +
				'<p>' + destacado.descripcion_corta + '</p></div>'+
				'<p>'+ imagen +'</p>' +
				'</li></a>');
			
		});
		$('#destacadosList').listview('refresh');
	});
mostrarDestacados();	
}


function getCitaForm() {
	
	mostrarCita();
}


function getAvisosList() {
	
	mostrarAvisos();
	/*$.getJSON(serviceocasionURL, function(data) {
		$('#ocasionList li').remove();
		eventos = data;
		$.each(eventos, function(index, ocasion) {
			$('#ocasionList').append('<li><a href="ocasiondetails.html?id=' + ocasion.id_casco + '">' +
					'<img src="' + ocasion.ruta_imagen + '"/>' +
					'<h4>' + ocasion.modelo + '</h4>' +
					'<p>' + ocasion.kilometros + ' kil&oacute;metros - ' + ocasion.precio + '</p></li>');
		});
		$('#ocasionList').listview('refresh');
	});*/
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
			
			$('#descripcion').append("<h5>Descripción</h5><p>"+data.descripcion+"</p>");
			
		//});
		//$('#actionList').listview('refresh');
	});
	
	
}


function getSesionForm() {

	if((sesion!='')&&(sesion!='0'))
	{
		cerrar_sesion();
		sesion = '';
		document.getElementById('mencerrar').id='meniniciar';
		alert('Sesión cerrada correctamente');
		$("#binicio").attr("src","img/binicio.png");
	}
	mostrarSesion();
}

function mostrarDestacados()
{
  //$('#apptitle').text('Destacados');
  $("#imgcab").attr("src","img/cab_descatado.png");
  $('#contenedorDestacados').show();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
}


function mostrarCita()
{
 // $('#apptitle').text('Solicitar Cita');
  $("#imgcab").attr("src","img/cab_cita.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').show();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
}

function mostrarAvisos()
{
  //$('#apptitle').text('Notificaciones/Avisos');
  $("#imgcab").attr("src","img/cab_alertas.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').show();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
}


function mostrarSesion()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_inicio.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').show();
  $('#contenedorDetalle').hide();
}

function mostrarDetalle()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_oferta.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').show();
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
