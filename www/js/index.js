var app = { 
		
    // Application Constructor 
    initialize: function() { 
		var regId = ''; var cod_personal = ''; var pagina = '';
		window.localStorage.setItem("regId", regId);
		window.localStorage.setItem("cod_personal", cod_personal);
		window.localStorage.setItem("pagina", pagina);

		this.bindEvents(); 
		
    }, 
    // Bind Event Listeners 
    // 
    // Bind any events that are required on startup. Common events are: 
    // 'load', 'deviceready', 'offline', and 'online'. 
    bindEvents: function() { 
	
        document.addEventListener('deviceready', this.onDeviceReady, false); 
    }, 
    // deviceready Event Handler 
    // 
    // The scope of 'this' is the event. In order to call the 'receivedEvent' 
    // function, we must explicity call 'app.receivedEvent(...);' 
    onDeviceReady: function() { 
	
        app.receivedEvent('deviceready'); 

    }, 
    // Update DOM on a Received Event 
    receivedEvent: function(id) { 

        console.log('Received Event: ' + id);
		//alert('Received Event: ' + id);

var pushNotification = window.plugins.pushNotification; 

var so= device.platform;

       // if (device.platform == 'android' || device.platform == 'Android') { 
           // alert("Register called"); 
            //tu Project ID aca!! 
	if(so=="Android")
	{

		pushNotification.register(this.successAndroid, this.errorHandler,{"senderID":"112340636347","ecb":"app.onNotificationGCM"});  
    }
	else if(so=="iOS")
	{

		pushNotification.register(this.successIOS, this.errorHandler,{"badge":"true", "sound": "true", "alert": "true", "ecb":"app.onNotificationAPN"});
	}
	
    }, 
    // funcion aviso si todo es correcto en ANDROID // 
				successAndroid: function(result) { 
					// se muestra si la obtención del regId ha sido correcta //
					/*alert('Callback Success! Result = '+result);*/
				}, 
				
				// funcion aviso si todo es correcto en IOS // 
				successIOS: function(result) { 
					// a diferencia de la parte android aqui el valor "result" es el token del dispositivo //
					// guardamos en el dispositivo el token, para poder usarlo mas tarde //
					regId = result;
					registrar_dispositivo(regId,'IOS');
					setTimeout(comprobar_sesion(regId),10000);	
				}, 
				
				successHandler: function(result) { 
					alert(result);
				}, 
    errorHandler:function(error) { 
        alert(error); 
    }, 
    onNotificationGCM: function(e) { 

		switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                {			
                    console.log("Regid " + e.regid); 
                    //alert('registration id = '+e.regid); 
                    //Cuando se registre le pasamos el regid al input 
					regId = e.regid;
                    //document.getElementById('regId').value = regId; 	
					registrar_dispositivo(regId,'ANDROID');	
					setTimeout(comprobar_sesion(regId),10000);			
                } 
            break; 

            case 'message': 
              // NOTIFICACION!!! 
			  if(e.payload.url){ pagina=e.payload.url; window.localStorage.setItem("pagina", pagina);}
			  
            break; 

            case 'error': 
              alert('GCM error = '+e.msg); 
            break; 

            default: 
              alert('An unknown GCM event has occurred'); 
            break; 
        } 

    }, 
    onNotificationAPN: function(event) { 
	
        var pushNotification = window.plugins.pushNotification; 
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert); 
         
        if (event.alert) { 
            navigator.notification.alert(event.alert); 
        } 
        if (event.badge) { 
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
        } 
        if (event.sound) { 
            var snd = new Media(event.sound); 
            snd.play(); 
        } 
		
    }

};

function registrar_dispositivo(regId,sistema){	 
	var xmlhttp =new XMLHttpRequest();
	xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&sist="+sistema+"&new=S",false);
	xmlhttp.send(null);	
}

function comprobar_sesion(a)
{	
	var dataString = "regId="+a+"&comprobarses=S";
		$.ajax({ 
            type: "POST",
            url: "http://www.fulp.es/FULP/mensajesapp/registro_app.php",
            data: dataString,
            success: function(data) {
			
				cod_personal = data;
				
				window.localStorage.setItem("regId", regId);
				
				window.localStorage.setItem("cod_personal", cod_personal);
				
				//document.getElementById("cod_personal").value=data;
				setTimeout(document.getElementById('resgistro').submit(),10000);
            }
        });
}