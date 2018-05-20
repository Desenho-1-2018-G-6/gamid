let canvas = gamid.graphics.getCanvas(200, 200);
gamid.graphics.setBackgroundColor(canvas, 'red');

let square = gamid.graphics.square(canvas, 20, 20, 'blue');
square.speedX = 20;
square.speedY = 20;

document.body.appendChild(canvas);