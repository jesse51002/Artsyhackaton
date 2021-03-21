export class Pixel{
    constructor(){
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.a = 0;
    }

    setColor = function(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    changeTrans = function(a){
        this.a = a;
    }
}