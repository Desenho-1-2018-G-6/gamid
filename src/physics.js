let physics = (function() {

  class Physics extends BaseObjectDecorator {
    constructor(baseObject, objectList){
      super(baseObject);
      this.baseObject = baseObject;
      this.objectList = objectList;
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
    constructor(baseObject, objectList){
      super(baseObject, objectList);
      this.personalObjectList = [];
      this.buildDistanceList();
    }

    buildDistanceList(){
      this.personalObjectList = [];

      for(let i = 0; i < this.objectList.length; i++){
        for(let j = i+1; j < this.objectList.length; j++){
          let obj = new Object();
          obj.first = this.objectList[i].decoratedObject;
          obj.second = this.objectList[j].decoratedObject;
          obj.distance = (
            this.getDistance(this.objectList[i].decoratedObject,
            this.objectList[j].decoratedObject)
          );
          this.personalObjectList.push(obj);
        }
      }

      console.log(this.personalObjectList);

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

  }

  return {
    Physics,
    SquareCollision
  }

}());
