let physics = (

  class Physics extends BaseObjectDecorator {
    constructor(baseObject, objectList){
      super(baseObject);
      this.baseObject = baseObject;
      this.objectList = objectList;
      this.personalObjectList = [];
    }

    buildObjectList(){
      // Method to overwrite
    }

    getObjectDistance(referenceBaseObject, baseObjectInList){
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

  return {
    physics
  }

);
