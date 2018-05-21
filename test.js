let canvas = gamid.graphics.getCanvas(800, 800);
gamid.graphics.setBackgroundColor(canvas, 'red');

let square = new gamid.graphics.Square(canvas, 50, 50, 'blue');
square.speedX = 20;
square.speedY = 20;

document.body.appendChild(canvas);