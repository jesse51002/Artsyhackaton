
var curColor = [255,0,0];
var getCurrentColor = function (){
    return curColor;
}


var color = document.getElementById("color");

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



color.addEventListener('input',() => {
    curColor = [hexToRgb(color.value).r,hexToRgb(color.value).g,hexToRgb(color.value).b , 1];
});


export{getCurrentColor};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function setColor(newCOlor){
    curColor = newCOlor;
    color.value = rgbToHex(newCOlor[0],newCOlor[1],newCOlor[2]);
} 
