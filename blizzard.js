let canvasInstance = new gamid.graphics.Canvas(800, 800, 'darkgreen');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

for (let i = 0; i < 10000; i++){
    // let abc=['blue', 'red', 'yellow', 'green', 'gray']
    let xxx = Math.random()*800
    let yyy = Math.random()*800

    let color = 'red'

    let abc=['#009','yellow','yellow']
    if (xxx >400) {
      abc=['white', 'black']
    }
    // FIXME DÁ PRA CRIAR UM OBJETO SQUARE SEM UMA DAS POSIÇÕES X E Y (CORRIJAM) (OU É PQ FICA SEM COR, SEI LÁ)
    // let square = new gamid.graphics.Square(2, 2, Math.random()*800, Math.random()*800, abc[Math.floor(Math.random()*abc.length)]);

    let square = new gamid.graphics.Square(3, 3, xxx, yyy, abc[Math.floor(Math.random()*abc.length)]);


    a = new gamid.controller.Keyboard(square, [87, 65, 83, 68, 73, 74, 75, 76]);
     // = new gamid.controller.Keyboard(square, [73, 74, 75, 76]);

    canvasInstance.addObject(square);
    // square.speedX = 20;
    // square.speedY = 20;

    // a.setOnKeyUp(87, function(){square.speedY = 0});
    if (xxx<400) {
      a.setOnKeyDown(87, function(){square.speedY -= Math.random()*100;});

      // a.setOnKeyUp(83, function(){square.speedY = 0});
      a.setOnKeyDown(83, function(){square.speedY += Math.random()*100; });

      // a.setOnKeyUp(65, function(){square.speedX = 0});
      a.setOnKeyDown(65, function(){square.speedX -= Math.random()*100; });

      // a.setOnKeyUp(68, function(){square.speedX = 0});
      a.setOnKeyDown(68, function(){square.speedX += Math.random()*100; });
    } else {
      a.setOnKeyDown(73, function(){square.speedY -= Math.random()*100;});

      // a.setOnKeyUp(83, function(){square.speedY = 0});
      a.setOnKeyDown(75, function(){square.speedY += Math.random()*100; });

      // a.setOnKeyUp(65, function(){square.speedX = 0});
      a.setOnKeyDown(74, function(){square.speedX -= Math.random()*100; });

      // a.setOnKeyUp(68, function(){square.speedX = 0});
      a.setOnKeyDown(76, function(){square.speedX += Math.random()*100; });
  }

}

document.body.appendChild(canvas);


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
