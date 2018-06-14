let physics = (function() {

  let collidedObjectList = []

  class Physics extends BaseObjectDecorator {
    constructor(baseObject){
      super(baseObject);
    }

    buildObjectList(){
      // Method to overwrite
    }

    getDistance(referenceBaseObject, baseObjectInList){
      // Method  to overwrite
    }

    resolveObjectCollision(){
      // Method  to overwrite
    }

    resolveBorderCollision(){
      // Method  to overwrite
    }

    resolveGravity(){
      // Method  to overwrite
    }

  }

  class SquareCollision extends Physics {
    constructor(baseObject){
      super(baseObject);
      this.baseObject = baseObject;
      // graphics.collidableObjects.push(baseObject);
      console.log(graphics);
      graphics.collidableObjects.push(this);
      this.buildList = graphics.collidableObjects;
    }

    getDistance(rec1, rec2){
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

      return Math.sqrt(a*a+b*b);
    }

    resolveObjectCollision(){
      for(let i in this.buildList){
        if(this.buildList[i].baseObject !== this.baseObject){
          if(this.getDistance(this.buildList[i].baseObject, this.baseObject) <= 1){
            // this.buildList[i].decoratedObject.decoratedObject.speedX = -this.buildList[i].decoratedObject.decoratedObject.speedX;
            // this.buildList[i].decoratedObject.decoratedObject.speedY = -this.buildList[i].decoratedObject.decoratedObject.speedY;
            this.baseObject.speedX *= -1;
            this.baseObject.speedY *= -1;
          }
        }
      }
    }

    resolveBorderCollision() {
      for(let i in this.buildList){
        let x = this.buildList[i].baseObject.x;
        let y = this.buildList[i].baseObject.y;
        let width = this.buildList[i].baseObject.width;
        let height = this.buildList[i].baseObject.height;

        if(x < 0
          || y < 0
          || x > (graphics.canvasList[0].width - width)
          || y > (graphics.canvasList[0].height - height)){
              this.baseObject.speedX *= -1;
              this.baseObject.speedY *= -1;
        }
      }
    }
  }

  return {
    Physics,
    SquareCollision,
    collidedObjectList
    // this.objectList
  }

}());
