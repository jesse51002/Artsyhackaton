import {getCurrentColor, setColor} from "./ColorPicker.js";
import {getPixel, getCamera} from "./paintMain.js";

class Pencil{
    constructor(){
        this.drawing =false;
    }

    draw = (posX, posY) => {
        let pxl = getPixel(posX, posY);

        if(pxl){
            let curColor = getCurrentColor();
            pxl.r = curColor[0];
            pxl.g = curColor[1];
            pxl.b = curColor[2];
            pxl.a = 1;
        }

        this.drawing =true;

    }

    endDraw = () =>{
        this.drawing =false;
    }

}

class Eraser{
    constructor(){
        this.erasing =false;
    }

    erase = (posX, posY) => {
        let pxl = getPixel(posX, posY);

        if(pxl){
            let curColor = getCurrentColor();
            pxl.r = curColor[0];
            pxl.g = curColor[1];
            pxl.b = curColor[2];
            pxl.a = 0;

            
        }
        

        this.erasing =true;
    }

    endDraw = () =>{
        this.erasing =false;
    }
}

class EyeDropper{
    getColor = (posX,posY) =>{
        let pxl = getPixel(posX, posY);

        if(pxl){
            if(pxl.a == 0){
                setColor([255,255,255,1]);
            }
            else{
                setColor([pxl.r,pxl.g,pxl.b,1]);
            }
        }
    }
}

export class Tools{
    constructor(){
        this.tool = "";
        this.currentOptions = null;
        this.currentSelected= null;
        this.cam = getCamera();

        let handleToolSelect = (id) =>{
            if(id === this.tool){
                return;
            }

            console.log("Selecting the tool " + id);
            this.tool = id;
    
            let element = document.getElementById(id);
            element.className = "Tool ToolSelected";
    
            if(this.currentSelected){
                this.currentSelected.className = "Tool ToolNotSelected";
            }
    
            this.currentSelected = element;
            /*
            if(this.currentOptions){
                this.currentOptions.style.display= "none";
            }
            
            switch(id){
                case "PaintTool":
                    this.currentOptions = document.getElementById("PaintToolOptions");
                    document.getElementById("PaintToolOptions").style.display = "block";
                    break;
                case "EraserTool":
                    this.currentOptions = document.getElementById("EraserToolOptions");
                    document.getElementById("EraserToolOptions").style.display = "block";
                    break;
                default:
                    break;
            }
            */
        };

        //document.getElementById("PaintTool").onclick = function(){handleToolSelect("PaintTool")};
        document.getElementById("PencilTool").onclick = function(){handleToolSelect("PencilTool")};
        //document.getElementById("BucketTool").onclick = function(){handleToolSelect("BucketTool")};
        document.getElementById("EraserTool").onclick = function(){handleToolSelect("EraserTool")};
        document.getElementById("ColorPickerTool").onclick = function(){handleToolSelect("ColorPickerTool")};
        
        window.addEventListener("load", () =>{
            this.handleMouse();
        });
        
    }

    handleMouse = () =>{
        let pencil = new Pencil();
        let eraser = new Eraser();
        let eyeDrop = new EyeDropper();
        let yOffset = 50;
        let xOffset = 200;

        let startClick = (e) =>{
            let gridPos = this.cam.posToPixel(e.clientX- xOffset, e.clientY - yOffset);

            switch(this.tool){
                case "PencilTool":
                    pencil.draw(gridPos[0], gridPos[1]);
                    this.cam.render();
                    break;
                case "EraserTool":
                    eraser.erase(gridPos[0], gridPos[1]);
                    this.cam.render();
                    break;
                case "ColorPickerTool":
                    eyeDrop.getColor(gridPos[0], gridPos[1]);
                    break;
            }
            
        }

        let endClick = (e) =>{
            switch(this.tool){
                case "PencilTool":
                    pencil.endDraw();
                    this.cam.render();

                case "EraserTool":
                    eraser.endDraw();
                    this.cam.render();
                    break;
            }

            this.cam.render();
        }

        let movingMouse = (e) => {
            let gridPos = this.cam.posToPixel(e.clientX- xOffset, e.clientY- yOffset);

            switch(this.tool){
                case "PaintTool":
                    break;
                case "PencilTool":
                    if(pencil.drawing){
                        pencil.draw(gridPos[0], gridPos[1]);
                        this.cam.render();
                    }
                    break;
                case "EraserTool":
                    if(eraser.erasing){
                        eraser.erase(gridPos[0], gridPos[1]);
                        this.cam.render();
                    }
                   break;
            }

           
        }


        this.cam.canvas.addEventListener("mousedown", startClick);
        this.cam.canvas.addEventListener("mouseup", endClick);
        this.cam.canvas.addEventListener("mousemove", movingMouse);

    }
}
