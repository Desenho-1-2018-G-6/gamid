let graphics = (function(){
    
    let objects = [];
    let canvasList = [];
    
    // classes

    class BaseObject {
        constructor(width, height, x, y){
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            objects.push(this);
        }

        update(){
            throw new Error('You have to implement update method!');
        }

        newPosition(){
            throw new Error('You have to implement update method!');
        }
    }

    class Square extends BaseObject {
        constructor(canvas, width, height, color){
            super(width, height, 0, 0);
            this.speedX = 0;
            this.speedY = 0;
            this.color = color;
            this.canvas = canvas;
            this.controller;
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

    class Canvas {
        constructor(width, height, color){
            this.element = document.createElement('canvas');
            this.id ='gamid-canvas';
            this.height = height;
            this.width = width;
            this.color = color;

            this.element.id = this.id;
            this.element.height = this.height;
            this.element.width = this.width;
            this.element.color = this.color;

            canvasList.push(this);
        }

        setBackgroundColor(color){
            this.color = color;
            this.element.color = this.color;
            let ctx = this.element.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    return{
        Canvas,
        Square,
        objects,
        canvasList  
    }
}());