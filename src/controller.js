class BaseObjectDecorator extends graphics.BaseObject {
  constructor(baseObject){
    super(baseObject.width, baseObject.height, baseObject.x, baseObject.y);
  }

  onKeyUp(){
    super.onKeyUp();
  }

  onKeyDown(){
    super.onKeyDown();
  }
}

let controller = (function(){

  class Controller extends BaseObjectDecorator {
    constructor(baseObject, keyList){
      super(baseObject);
      this.keyList = keyList;
    }

    onKeyUp(){
      super.onKeyUp();
      console.log("WOOOOOOOOOOO");
    }

    onKeyDown(){
      super.onKeyDown();
      console.log("WAAAAAAAAAAAAAA");
    }

  }



  return {
    Controller
  }

}());
