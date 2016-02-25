var app = { 
	
	
    // Application Constructor 
    initialize: function() { 

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
	
        var parentElement = document.getElementById(id); 
       /* var listeningElement = parentElement.querySelector('.listening'); 
        var receivedElement = parentElement.querySelector('.received'); 
        listeningElement.setAttribute('style', 'display:none;'); 
        receivedElement.setAttribute('style', 'display:block;'); */

        console.log('Received Event: ' + id);
		//alert('Received Event: ' + id);
		
var pushNotification = window.plugins.pushNotification; 
       // if (device.platform == 'android' || device.platform == 'Android') { 
           // alert("Register called"); 
            //tu Project ID aca!! 
     pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"112340636347","ecb":"app.onNotificationGCM"}); 
	 
      /* } 
        else { 
            alert("Register called"); 
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"}); 
        } */
    }, 
    // result contains any message sent from the plugin call 
    successHandler: function(result) { 
        //alert('Callback Success! Result = '+result) 
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
					var regId = e.regid;
					
                    document.getElementById('regId').value = regId; 
					var sesion = '';		
					
					registrar_dispositivo();		
					
					setTimeout(comprobar_sesion(regId),10000);
												
                } 
            break; 

            case 'message': 
              // NOTIFICACION!!! 
              //alert('message = '+e.message+' msgcnt = '+e.msgcnt+' url = '+e.payload.url); 
			  
			  comprobar_sesion(regId);	

			  if(e.payload.url){ document.getElementById('pagina').value=e.payload.url; $("#resgistro").attr("action",'pagina2.html');}
			  
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

function registrar_dispositivo(){	 
	 var xmlhttp =new XMLHttpRequest();
	
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+document.getElementById("regId").value+"&cod_personal="+document.getElementById("cod_personal").value+"&new=S",false);

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
				document.getElementById("cod_personal").value=data;
				setTimeout(document.getElementById('resgistro').submit(),10000);
            }
        });
}