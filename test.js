let canvasInstance = new gamid.graphics.Canvas(800, 800, 'purple');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

let square = new gamid.graphics.Square(canvas, 50, 50, 'blue');
square.speedX = 20;
square.speedY = 20;

document.body.appendChild(canvas);