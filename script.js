/* Web Notifications */
function displayFirstNotification(){
	$("#btnEnableNotifications").hide();

    var options = {
        body: "Je bent subscribed op de notificaties van YourWardrobe! Bedankt!",
        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 70, 40, 500]
        
    }
    
	navigator.serviceWorker.ready.then(function(registration){
		registration.showNotification("Successfully subscribed!!")
	})
}

function askForNotificationPermission(){
	Notification.requestPermission(function(result){
		console.log("user Choice", result);
		if(result != "granted"){
			console.log("No permission granted");
		} else {
			console.log("Permission granted!!!");
			displayFirstNotification();
		}

	})
}


$(function(){
	
	if('Notification' in window){
		$("#btnEnableNotifications").show();
		$("#btnEnableNotifications").click(askForNotificationPermission);
	}
	
})

/* Camera */
var constraints = {video: {facingMode: "user"}, audio: false};

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart(){
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream){
        track = stream.getTracks() [0];
        cameraView.srcObject = stream;
    })
        .catch(function(error){
        console.error("Oops, het werkt niet", error);
    });
}

cameraTrigger.onclick = function(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);