let graphics = (function(){
    
    let objects = [];
    let canvasList = [];
    
    // classes

    class BaseObject {
        constructor(){}

        update(){
            throw new Error('You have to implement update method!');
        }

        newPosition(){
            throw new Error('You have to implement update method!');
        }
    }

    class Square extends BaseObject {
        constructor(canvas, width, height, color){
            super();
            this.width = width,
            this.height = height
            this.x = 0;
            this.y = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.color = color;
            this.canvas = canvas;
        }

        update(){
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        newPosition(dt){
            this.x += this.speedX * dt;
            this.y += this.speedY * dt;
        }
    }

    let square = function(canvas, width, height, color='white') {
        let square = new Square(canvas, width, height, color);
        objects.push(square);
        
        return square;
    }

    let getCanvas = function (width, height) {
        let canvas = document.createElement('canvas');
        canvas.id = 'mamid-canvas';
        canvas.height = height;
        canvas.width = width;
        canvas.color = "white";
        canvasList.push(canvas);
        return canvas;
    }

    let setBackgroundColor = function(canvas, color) {
        canvas.color = color;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    }



    return{
        getCanvas,
        setBackgroundColor,
        square,
        objects,
        canvasList  
    }
}());