var serviceDestacadosURL = "http://www.fulp.es/servicesfulp/ofertas.json";

var employees;

/*
$('#appsolListPage').bind('pageinit', function(event) {
	getDestacadosList();
});*/

 function getYouTubeInfo(id) {
						$.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+id+"&key=AIzaSyCRFtBQ4pANIXYaZapjjnaHNIeOVzPKwqY&part=snippet", function(data) {
					$.each(data.items, function(index, video) {
						 var title = video.snippet.title;
						 return title;
					});
					alert(title);
					//return title;
				});			
        }


function getDestacadosList() {
	
	mostrarDestacados();
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList li').remove();
		employees = data;
		$.each(employees, function(index, destacado) {
			if(destacado.tipo=='youtube')
			{
				$('#destacadosList').append('<a href="https://www.youtube.com/watch?v=' + destacado.id_solicitud + '"><li>' +
					'<h4>' + getYouTubeInfo(destacado.id_solicitud) + '</h4>' +
					'</li></a>');
			}
			else
			{
				$('#destacadosList').append('<a href="destacadodetails.html?id=' + destacado.id_solicitud + '"><li>' +
					'<h4>' + destacado.asunto + '</h4>' +
					'<p>' + destacado.entidad + '</p>' + cont_contrato + cont_salario + cont_jornada +					
					'</li></a>');
			}
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