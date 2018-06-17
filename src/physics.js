let physics = (function() {

    function getDistance(rec1, rec2){
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

    function resolveObjectCollision(actual, compared){
            let xVelocityDiff = actual.speedX - compared.speedX;
            let yVelocityDiff = actual.speedY - compared.speedY;

            let xDist = compared.x - actual.x;
            let yDist = compared.y - actual.y;

            if(xVelocityDiff*xDist + yVelocityDiff*yDist >= 0){
                let boSpeedX = actual.speedX;
                let boSpeedY = actual.speedY;
                let boMass = actual.mass;
                let blSpeedX = compared.speedX;
                let blSpeedY = compared.speedY;
                let blMass = compared.mass;

                const velocity1 = { x: boSpeedX * (boMass - blMass) / (boMass + blMass) + blSpeedX * 2 * blMass / (boMass + blMass),
                                    y: boSpeedY * (boMass - blMass) / (boMass + blMass) + blSpeedY * 2 * blMass / (boMass + blMass)};
                const velocity2 = { x: blSpeedX * (blMass - boMass) / (boMass + blMass) + boSpeedX * 2 * boMass / (boMass + blMass),
                                    y: blSpeedY * (blMass - boMass) / (boMass + blMass) + boSpeedY * 2 * boMass / (boMass + blMass)};

                actual.speedX = velocity1.x;
                compared.speedX = velocity2.x;

                actual.speedY = velocity1.y;
                compared.speedY = velocity2.y;
        }
    }

  class Physics extends BaseObjectDecorator {
    constructor(baseObject){
      super(baseObject);
      this.hasCollision = true; //boolean to resolve if object is collidable or not
      this.hasBorderCollision = true;
    }

    beforeCollision(){
      // Method to overwrite
    }

    afterCollision(referenceBaseObject, baseObjectInList){
      // Method  to overwrite
    }

    beforeBorderCollision(){

    }

    afterBorderCollision(){

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

                if(x < 0 && xVelocityDiff*xDist >=0
                  || x > (graphics.canvas.width - width) && xVelocityDiff*(graphics.canvas.width - width) >=0){
                    if(!this.hasBorderCollision){
                      this.beforeBorderCollision(this.baseObject);
                    }else{
                      this.baseObject.speedX *= -1;
                      this.afterBorderCollision(this.baseObject);
                    }
                }

                if(y < 0 && yVelocityDiff*yDist >=0
                  || y > (graphics.canvas.height - height) && yVelocityDiff*(graphics.canvas.height - height) >=0){
                    if(!this.hasBorderCollision){
                      this.beforeBorderCollision(this.baseObject);
                    }else{
                      this.baseObject.speedY *= -1;
                      this.afterBorderCollision(this.baseObject);
                    }
                } 
    }

    resolveGravity(){
      // Method  to overwrite
    }

  }

  class SquareCollision extends Physics {
    constructor(baseObject){
      super(baseObject);
      this.baseObject = baseObject;
      graphics.collidableObjects.push(this);
      this.buildList = graphics.collidableObjects;
    }

    checkDistance(){
        for(let i in this.buildList) {
            if (this.baseObject === this.buildList[i].baseObject) continue;
              if(getDistance(this.baseObject, this.buildList[i].baseObject) <=1) {
                
                if(!this.hasCollision || !this.buildList[i].hasCollision){
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
