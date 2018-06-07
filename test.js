let canvasInstance = new gamid.graphics.Canvas(800, 800, 'purple');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

let square = new gamid.graphics.Square(50, 50, 'blue');
// canvasInstance.addObject(square);
square.speedX = 20;
square.speedY = 20;

document.body.appendChild(canvas);
