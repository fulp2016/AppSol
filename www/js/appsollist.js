var serviceDestacadosURL = "http://www.fulp.es/servicesfulp/ofertas.json";

var employees;

/*
$('#appsolListPage').bind('pageinit', function(event) {
	getDestacadosList();
});*/

 /*function getYouTubeInfo(id) {
						$.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyCRFtBQ4pANIXYaZapjjnaHNIeOVzPKwqY&part=snippet", function(data) {
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
	
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList li').remove();
		employees = data;
		var i=0;
		$.each(employees, function(index, destacado) {
			if(destacado.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = destacado.enlace;
			}
			else if(destacado.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace = destacado.enlace;
			}
			else if(destacado.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace = destacado.enlace;
			}
			else if(destacado.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = "detalle.html?id="+destacado.id;
			}
			else if((destacado.tipo=='B')||(destacado.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = "detalle.html?id="+destacado.id+"&regId="+regId+"&cod_personal="+cod_personal;
			}
			/*$('#destacadosList').append('<a href="' + enlace + '"><li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + destacado.titulo + '</h4>' +
				'<p>' + destacado.descripcion_corta + '</p></div>' +
				'</li></a>');*/
			$('#destacadosList').append('<form method="get" action="detalle.html">'+
				'<input type="hidden" value="'+destacado.id+'" name="id">'+
				'<li>' +
				'<div class="imagn"><a data-role="submit" ><img src="'+ icono +'"></a></div> '+
				'<div class="contn"><h4>' + destacado.titulo + '</h4>' +
				'<p>' + destacado.descripcion_corta + '</p></div>' +
				'</li></form>');	
			
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
}


function mostrarCita()
{
 // $('#apptitle').text('Solicitar Cita');
  $("#imgcab").attr("src","img/cab_cita.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').show();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
}

function mostrarAvisos()
{
  //$('#apptitle').text('Notificaciones/Avisos');
  $("#imgcab").attr("src","img/cab_alertas.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').show();
  $('#contenedorSesion').hide();
}


function mostrarSesion()
{
  //$('#apptitle').text('Iniciar Sesión');
  $("#imgcab").attr("src","img/cab_inicio.png");
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').show();
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
