import {createNewCanvas} from './paintMain.js'

var newProjMenuPressed = function(){
    let projWindow = document.getElementById("NewProjWindow");

    if(projWindow.className === "NewProjOpen"){
        projWindow.className = "NewProjClose";
    }
    else{
        projWindow.className = "NewProjOpen";
    }
}


document.getElementById("NewProjCloseBtn").onclick = newProjMenuPressed;
document.getElementById("NewProjHeader").onclick = newProjMenuPressed;

var createNewProjPressed =function(id){
    let width = document.getElementById("newProjWidth").value;
    let height = document.getElementById("newProjHeight").value;

    let errorMsg = document.getElementById("NewProjErrorMsg");

    if(width> 2000 || height > 2000 || width < 1 || height < 1){
        errorMsg.innerText = "The width and height must be in between 1 - 2000";
    }
    else{
        errorMsg.innerText = "";
        createNewCanvas(width, height);
        newProjMenuPressed();
        console.log("Closed Tab");
    }
}

document.getElementById("ProjAcceptBtn").onclick = createNewProjPressed;


