let gamid = (function () {
  let graphics = (function () {

    let objects = [];
    let canvas = new Object();
    let collidableObjects = [];

    class BaseObject {
      constructor(width, height, x, y, mass) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.mass = mass;
      }

      update() {
        throw new Error('You have to implement update method!');
      }

      newPosition() {
        throw new Error('You have to implement update method!');
      }

      onKeyUp() {

      }

      onKeyDown() {

      }
    }

    class Square extends BaseObject {
      constructor(width, height, x, y, mass, color) {
        super(width, height, x, y);
        this.speedX = 0;
        this.speedY = 0;
        this.mass = mass;
        this.color = color;
      }

      update() {
        let ctx = graphics.canvas.element.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      newPosition(dt) {
        this.x += this.speedX * dt;
        this.y += this.speedY * dt;
      }
    }

    class Canvas {
      constructor(width, height, color) {
        this.element = document.createElement('canvas');
        this.id = 'gamid-canvas';
        this.height = height;
        this.width = width;
        this.color = color;
        // this.objects = [];

        this.element.id = this.id;
        this.element.height = this.height;
        this.element.width = this.width;
        this.element.color = this.color;

        graphics.canvas = this;
      }

      addObject(baseObject) {
        graphics.objects.push(baseObject);
      }

      deleteObject(baseObject) {
        const index = graphics.objects.indexOf(baseObject);
        if (index !== -1) {
          graphics.objects.splice(index, 1);
        }
      }

      setBackgroundColor(color) {
        this.color = color;
        this.element.color = this.color;
        let ctx = this.element.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    return {
      Canvas,
      Square,
      objects,
      canvas,
      BaseObject,
      collidableObjects
    }
  }());


  class BaseObjectDecorator extends graphics.BaseObject {
    constructor(baseObject) {
      super(baseObject.width, baseObject.height, baseObject.x, baseObject.y);
      this.decoratedObject = baseObject;
    }

    update() {
      this.decoratedObject.update();
    }

    newPosition(dt) {
      this.decoratedObject.newPosition(dt);
    }

    onKeyUp() {
      this.decoratedObject.onKeyUp();
    }

    onKeyDown() {
      this.decoratedObject.onKeyDown();
    }
  }

  let controller = (function () {

    class Controller extends BaseObjectDecorator {
      constructor(baseObject, keyList) {
        super(baseObject);
        this.keyList = keyList;
        this.functionList = [];
        this.createKeysFunction();
      }

      createKeysFunction() {
        for (let i = 0; i < this.keyList.length; i++) {
          let obj = new Object();
          obj.key = this.keyList[i];
          obj.onKeyUpFunc = function () { };
          obj.onKeyDownFunc = function () { };
          this.functionList.push(obj);
        }
      }

      addKey(key, onKeyDown = function () { }, onKeyUp = function () { }) {

        let hasKey = false;

        for (let i = 0; i < this.functionList.length; i++) {
          if (key == this.functionList[i].key) {
            hasKey = true;
            i = this.functionList.length;
          }
        }

        if (hasKey) {
          return "Key already on the list."
        }

        let obj = new Object();
        obj.key = key;
        obj.onKeyUpFunc = onKeyUp;
        obj.onKeyDownFunc = onKeyDown;
        this.functionList.push(obj);

        return "Key has been created."
      }

      setOnKeyUp(key, func) {
        let counter = false;
        for (let i in this.functionList) {
          if (key == this.functionList[i].key) {
            this.functionList[i].onKeyUpFunc = func;
            counter = true;
          }
        }
        if (!counter) {
          return "Could not find key";
        }
        return "Function changed";
      }

      setOnKeyDown(key, func) {
        let counter = false;
        for (let i in this.functionList) {
          if (key == this.functionList[i].key) {
            this.functionList[i].onKeyDownFunc = func;
            counter = true;
          }
        }
        if (!counter) {
          return "Could not find key";
        }
        return "Function changed";
      }

      onKeyUp() {
        super.onKeyUp();
      }

      onKeyDown() {
        super.onKeyDown();
      }
    }

    class Keyboard extends Controller {
      constructor(baseObject, keyList) {
        super(baseObject, keyList);
        // this.functionList = [];
        document.addEventListener("keydown", (event) => this.onKeyDown(event, this.functionList));
        document.addEventListener("keyup", (event) => this.onKeyUp(event, this.functionList));
      }

      onKeyDown(event, functionList) {
        super.onKeyDown();

        for (let i in functionList) {
          if (event.keyCode == functionList[i].key) {
            functionList[i].onKeyDownFunc();
          }
        }
      }

      onKeyUp(event, functionList) {
        super.onKeyUp();

        for (let i in functionList) {
          if (event.keyCode == functionList[i].key) {
            functionList[i].onKeyUpFunc();
          }
        }
      }
    }

    return {
      Controller,
      Keyboard
    }

  }());

  let audio = (function () {

    class Audio extends BaseObjectDecorator {
      constructor(baseObject, fileList) {
        super(baseObject);
        this.fileList = fileList;
        this.soundList = [];
        this.addAudio(fileList);
      }

      addAudio(fileList) {
        for (let i in fileList) {
          let sound = document.createElement("audio");
          this.createAudio(sound, fileList[i]);
          this.soundList.push(sound);
        }
      }

      createAudio(sound, soundName) {
        sound.src = soundName;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("control", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
      }

      play(soundName) {
        for (let i in this.soundList) {
          if (this.soundList[i].attributes.src.nodeValue === soundName) {
            this.soundList[i].loop = false;
            this.soundList[i].play();
          }
        }
      }

      pause(soundName) {
        for (let i in this.soundList) {
          if (this.soundList[i].attributes.src.nodeValue === soundName) {
            this.soundList[i].pause();
          }
        }
      }

      loop(soundName) {
        for (let i in this.soundList) {
          if (this.soundList[i].attributes.src.nodeValue === soundName) {
            this.soundList[i].loop = true;
            this.soundList[i].play();
          }
        }
      }

      stop(soundName) {
        for (let i in this.soundList) {
          if (this.soundList[i].attributes.src.nodeValue === soundName) {
            this.soundList[i].pause();
            this.soundList[i].currentTime = 0;
          }
        }
      }
    }

    return {
      Audio
    }

  }());

  let physics = (function () {

    function getDistance(rec1, rec2) {
      let x1, x2, y1, y2;
      let w, h;
      if (rec1.x > rec2.x) {
        x1 = rec2.x;
        w = rec2.width;
        x2 = rec1.x;
      } else {
        x1 = rec1.x;
        w = rec1.width;
        x2 = rec2.x;
      }
      if (rec1.y > rec2.y) {
        y1 = rec2.y;
        h = rec2.height;
        y2 = rec1.y;
      } else {
        y1 = rec1.y;
        h = rec1.height;
        y2 = rec2.y;
      }
      let a = Math.max(0, x2 - x1 - w);
      let b = Math.max(0, y2 - y1 - h);

      return Math.sqrt((a * a) + (b * b));
    }

    function resolveObjectCollision(actual, compared) {
      let xVelocityDiff = actual.speedX - compared.speedX;
      let yVelocityDiff = actual.speedY - compared.speedY;

      let xDist = compared.x - actual.x;
      let yDist = compared.y - actual.y;

      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        let boSpeedX = actual.speedX;
        let boSpeedY = actual.speedY;
        let boMass = actual.mass;
        let blSpeedX = compared.speedX;
        let blSpeedY = compared.speedY;
        let blMass = compared.mass;

        const velocity1 = {
          x: boSpeedX * (boMass - blMass) / (boMass + blMass) + blSpeedX * 2 * blMass / (boMass + blMass),
          y: boSpeedY * (boMass - blMass) / (boMass + blMass) + blSpeedY * 2 * blMass / (boMass + blMass)
        };
        const velocity2 = {
          x: blSpeedX * (blMass - boMass) / (boMass + blMass) + boSpeedX * 2 * boMass / (boMass + blMass),
          y: blSpeedY * (blMass - boMass) / (boMass + blMass) + boSpeedY * 2 * boMass / (boMass + blMass)
        };

        actual.speedX = velocity1.x;
        compared.speedX = velocity2.x;

        actual.speedY = velocity1.y;
        compared.speedY = velocity2.y;
      }
    }

    class Physics extends BaseObjectDecorator {
      constructor(baseObject) {
        super(baseObject);
        this.hasCollision = true; //boolean to resolve if object is collidable or not
        this.hasBorderCollision = true;
      }

      beforeCollision() {
        // Method to overwrite
      }

      afterCollision(referenceBaseObject, baseObjectInList) {
        // Method  to overwrite
      }

      beforeBorderCollision() {

      }

      afterBorderCollision() {

      }



      resolveBorderCollision() {


        let x = this.baseObject.x;
        let y = this.baseObject.y;
        let width = this.baseObject.width;
        let height = this.baseObject.height;

        let xVelocityDiff = this.baseObject.speedX;
        let yVelocityDiff = this.baseObject.speedY;

        let xDist = this.baseObject.x;
        let yDist = this.baseObject.y;

        if (x < 0 && xVelocityDiff * xDist >= 0
          || x > (graphics.canvas.width - width) && xVelocityDiff * (graphics.canvas.width - width) >= 0) {
          if (!this.hasBorderCollision) {
            this.beforeBorderCollision(this.baseObject);
          } else {
            this.baseObject.speedX *= -1;
            this.afterBorderCollision(this.baseObject);
          }
        }

        if (y < 0 && yVelocityDiff * yDist >= 0
          || y > (graphics.canvas.height - height) && yVelocityDiff * (graphics.canvas.height - height) >= 0) {
          if (!this.hasBorderCollision) {
            this.beforeBorderCollision(this.baseObject);
          } else {
            this.baseObject.speedY *= -1;
            this.afterBorderCollision(this.baseObject);
          }
        }
      }

      resolveGravity() {
        // Method  to overwrite
      }

    }

    class SquareCollision extends Physics {
      constructor(baseObject) {
        super(baseObject);
        this.baseObject = baseObject;
        graphics.collidableObjects.push(this);
        this.buildList = graphics.collidableObjects;
      }

      checkDistance() {
        for (let i in this.buildList) {
          if (this.baseObject === this.buildList[i].baseObject) continue;
          if (getDistance(this.baseObject, this.buildList[i].baseObject) <= 1) {

            if (!this.hasCollision || !this.buildList[i].hasCollision) {
              this.beforeCollision(this.baseObject, this.buildList[i].baseObject);
            } else {
              resolveObjectCollision(this.baseObject, this.buildList[i].baseObject);
              this.afterCollision(this.baseObject, this.buildList[i].baseObject);
            }
          }
        }
      }
    }

    return {
      Physics,
      SquareCollision,
      resolveObjectCollision,
      getDistance
    }
  }());


  return {
    graphics,
    controller,
    audio,
    physics
  };
}());


let time = (function () {
  class Time {
    constructor() {
      this.lastUpdate = 0;
      this.graphics = gamid.graphics;
      this.physics = gamid.physics;
    }

    setTime() {
      let that = this;
      this.lastUpdate = Date.now();
      setInterval(() => this.loop(), 2.08335);// 8.3334);//16.6667);
    }

    loop() {
      let now = Date.now();
      let dt = now - this.lastUpdate;
      this.lastUpdate = now;
      this.updateGame(dt);
    }

    updateGame(dt) {
      // clear all canvas
      let ctx = this.graphics.canvas.element.getContext('2d');
      ctx.clearRect(0, 0, this.graphics.canvas.width, this.graphics.canvas.height);
      this.graphics.canvas.setBackgroundColor(this.graphics.canvas.color);

      // move all objects
      for (let j in this.graphics.objects) {
        this.graphics.objects[j].newPosition(dt / 1000); // delta time in seconds
        this.graphics.objects[j].update();
      }

      for (let z in this.graphics.collidableObjects) {
        this.graphics.collidableObjects[z].checkDistance();
        this.graphics.collidableObjects[z].resolveBorderCollision();
      }

      // show fps
      ctx.fillStyle = 'black';
      ctx.fillText('fps:' + parseFloat(1 / (dt / 1000)).toFixed(2) + 'ms', 5, 10);
    }

  }

  new Time().setTime();

}());
// let timeInstance = new gamid.time.Time();
// timeInstance.setTime();
