import {Camera} from "./camera.js";
import {Pixel} from "./pixel.js";
import {getCurrentColor} from "./ColorPicker.js";
import {Tools} from "./tools.js";

var w;
var h;
var cam  = new Camera();
var tools = new Tools();
var canvas;

var createNewCanvas =function (wid, hei){
    console.log("Starting to create canves");
    w = Math.floor(parseFloat(wid));
    h = Math.floor(parseFloat(hei));
    canvas = new Array(w);
    for(let i = 0; i < w; i++){
        canvas[i] = new Array(h);
        for(let j = 0;j < h;j++){
            canvas[i][j] = new Pixel();
            console.log(canvas[i][j].r);
        }
    }
    cam.resetCamera(w,h, canvas);
    console.log("Created new canves");
}

export function getCanvas(){
    return canvas;
}

export function getCamera(){
    return cam;
}

export function getPixel(xPos, yPos){
    if(!canvas){
        return null;
    }
    else if(xPos >= canvas.length || xPos < 0){
        return null;
    }
    else if(yPos >= canvas[0].length || yPos < 0){
        return null;
    }

    return canvas[Math.floor(xPos)][Math.floor(yPos)];

}


export {createNewCanvas};