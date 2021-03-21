import {getCanvas} from "./paintMain.js";

export class Camera{

    constructor(){
        this.zoom = 10;
        this.posX = 0;
        this.posY = 0;  

        window.addEventListener("load", () =>{
            this.canvas = document.getElementById("PaintingCanvas");
            this.ctx = this.canvas.getContext('2d');
            this.render();
        });

        window.addEventListener("resize", () =>{
            if(!this.canvas){
                return;
            }
            this.render();
        });

        window.addEventListener('keydown', (event)=>{
            if (event.defaultPrevented || !this.pixels) {
                return;
            }
            let movePerc = 0.05;
            let xToy = this.pixels[0].length /this.pixels.length;
            switch (event.key) {
                case "ArrowDown":
                  // code for "down arrow" key press.
                  this.y = Math.min(2 * this.pixels[0].length, this.y + this.zoom * xToy * movePerc);
                  break;
                case "ArrowUp":
                  // code for "up arrow" key press.
                  this.y = Math.max(-2 * this.pixels[0].length, this.y - this.zoom * xToy * movePerc);
                  break;
                case "ArrowLeft":
                  // code for "left arrow" key press.
                  this.x = Math.max(-1 * this.pixels.length, this.x - this.zoom * movePerc);
                  break;
                case "ArrowRight":
                  // code for "right arrow" key press.
                  this.x = Math.min(2 * this.pixels.length, this.x + this.zoom * movePerc);
                  break;
                case"-":
                    this.zoom = Math.min(this.pixels.length* 5, this.zoom * 1.1);
                    break;
                case "+": case "=":
                    this.zoom = Math.max(3, this.zoom * 0.9);
                    break;
                default:
                  return; // Quit when this doesn't handle the key event.
              }

              event.preventDefault();

              this.render();
        }, true);

        
    }

    resetCamera = (gridSizeX, gridSizeY, pixels) => {
        this.zoom = gridSizeX + gridSizeX * 2;
        this.x = 3 * gridSizeX / 4;
        this.y = gridSizeY/2;
        this.pixels = pixels;
        console.log("ResetingCamera::");
        this.render();
    };

    posToPixel = (xPos, yPos) =>{
        if(!this.canvas){
            console.log("Canvas html hasn't loaded");
            return;
        }
        if(!this.pixels){
            console.log("No Canvas");
            return;
        }

        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;

        let xToyRatio = canvasHeight/canvasWidth;

        let pixelSize = canvasWidth/this.zoom;

        let cameraPxlRangeX = [this.x  - this.zoom/2, this.x  + this.zoom/2];
        let cameraPxlRangeY = [this.y  - (this.zoom * xToyRatio)/2, this.y  + (this.zoom * xToyRatio)/2];

        let percX = (xPos+pixelSize/2) / canvasWidth;
        let percY = (yPos+pixelSize/2) / canvasHeight;

        let pixelPosX = Math.floor(percX * (cameraPxlRangeX[1] - cameraPxlRangeX[0]) + cameraPxlRangeX[0]);
        let pixelPosY = Math.floor(percY * (cameraPxlRangeY[1] - cameraPxlRangeY[0]) + cameraPxlRangeY[0]);

        return [pixelPosX, pixelPosY];
    }


    render = () => {
        console.log("Rendering");
        if(!this.canvas){
            console.log("Canvas html hasn't loaded");
            return;
        }

        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.position = "fixed";
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;

        console.log("Canvas Width: " + canvasWidth + "\nCanvas Height: " + canvasHeight);
        
        this.ctx.clearRect(0,0, canvasWidth,canvasHeight );

        let xToyRatio = canvasHeight/canvasWidth;

        this.pixels = getCanvas();

        if(!this.pixels){
            console.log("No Canvas");
            return;
        }

        let pixelSize = canvasWidth/this.zoom;

        let cameraPxlRangeX = [this.x  - this.zoom/2, this.x  + this.zoom/2];
        let cameraPxlRangeY = [this.y  - (this.zoom * xToyRatio)/2, this.y  + (this.zoom * xToyRatio)/2];
        
        for(let xPxl = cameraPxlRangeX[0]; xPxl < cameraPxlRangeX[1]; xPxl++){
            

            let roundedX = Math.floor(xPxl);
            let diffX = xPxl - roundedX;
            
            let boxStartXPerc = 1 - (cameraPxlRangeX[1] - xPxl + diffX) / (cameraPxlRangeX[1] - cameraPxlRangeX[0]);
            
            let boxPixelStartX = boxStartXPerc * canvasWidth - pixelSize/2;
            let invisX = roundedX < 0 || roundedX >= this.pixels.length;
            for(let yPxl = cameraPxlRangeY[0]; yPxl < cameraPxlRangeY[1]; yPxl++){


                let roundedY = Math.floor(yPxl);
                let diffY = yPxl - roundedY;
                
                let boxStartYPerc = 1 - (cameraPxlRangeY[1] - yPxl + diffY) / (cameraPxlRangeY[1] - cameraPxlRangeY[0]);

                let boxPixelStartY =  boxStartYPerc * canvasHeight - pixelSize/2;

                var invisY = roundedY < 0 || roundedY >= this.pixels[0].length;
                if(!invisX && !invisY){
                    
                    let pixel = this.pixels[roundedX][roundedY];
                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'rgb(255,255,255)';
                    this.ctx.moveTo(boxPixelStartX, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY + pixelSize);
                    this.ctx.lineTo(boxPixelStartX, boxPixelStartY + pixelSize);
                    this.ctx.fill();

                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'rgba('+pixel.r+','+pixel.g+','+pixel.b+","+pixel.a+')';
                    this.ctx.moveTo(boxPixelStartX, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY + pixelSize);
                    this.ctx.lineTo(boxPixelStartX, boxPixelStartY + pixelSize);
                    this.ctx.fill();

                    this.ctx.strokeStyle = 'rgba(0,0,0,0.5)';
                    this.ctx.lineWidth = pixelSize / 20 + "";
                    this.ctx.moveTo(boxPixelStartX, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY);
                    this.ctx.lineTo(boxPixelStartX + pixelSize, boxPixelStartY + pixelSize);
                    this.ctx.lineTo(boxPixelStartX, boxPixelStartY + pixelSize);
                    this.ctx.stroke();
                }
            }
        }

    }
}