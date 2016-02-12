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
	
	mostrarDestacados();
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList li').remove();
		employees = data;
		var i=0;
		$.each(employees, function(index, destacado) {
			if(destacado.tipo=='YOUTUBE')
			{
				$('#destacadosList').append('<a href="' + destacado.enlace + '"><li>' +
						'<img src="img/ico-youtube.png"> '+
						'<h4>' + destacado.titulo + '</h4>' +
						'</li></a>');
			}
			else if(destacado.tipo=='INFOJOBS')
			{
				$('#destacadosList').append('<a href="' + destacado.enlace + '"><li>' +
						'<img src="img/ico-infojobs.png"> '+
						'<h4>' + destacado.titulo + '</h4>' +
						'</li></a>');
			}
			else
			{
				alert('o='+i);
				$('#destacadosList').append('<a href="destacadodetails.html?id=' + destacado.id + '"><li>' +
					'<h4>' + destacado.titulo + '</h4>' +					
					'</li></a>');
			}
		 i = i+1;
			
		});
		$('#destacadosList').listview('refresh');
	});
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
		document.getElementById('meniniciar').innerHTML='Iniciar sesión';
		alert('Sesión cerrada correctamente');
	}
	mostrarSesion();
}

function mostrarDestacados()
{
  $('#apptitle').text('Destacados');
  $('#contenedorDestacados').show();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
}


function mostrarCita()
{
  $('#apptitle').text('Solicitar Cita');
  $('#contenedorDestacados').hide();
  $('#contenedorCita').show();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
}

function mostrarAvisos()
{
  $('#apptitle').text('Notificaciones/Avisos');
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').show();
  $('#contenedorSesion').hide();
}


function mostrarSesion()
{
  $('#apptitle').text('Iniciar Sesión');
  $('#contenedorDestacados').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').show();
}

function cerrar_sesion(){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&cerrar=S",false);
	 xmlhttp.send(null);	
}

function change(a)
{
	document.getElementById("pagina").value=a;
	document.getElementById('irpagina').submit();
}