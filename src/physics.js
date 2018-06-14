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
        if(this.buildList[i].decoratedObject.decoratedObject !== this.baseObject.decoratedObject){
          if(this.getDistance(this.buildList[i].decoratedObject.decoratedObject, this.baseObject.decoratedObject) <= 1){
            // this.buildList[i].decoratedObject.decoratedObject.speedX = -this.buildList[i].decoratedObject.decoratedObject.speedX;
            // this.buildList[i].decoratedObject.decoratedObject.speedY = -this.buildList[i].decoratedObject.decoratedObject.speedY;
            this.baseObject.decoratedObject.speedX *= -1;
            this.baseObject.decoratedObject.speedY *= -1;
          }
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
