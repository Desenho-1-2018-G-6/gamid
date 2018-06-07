class BaseObjectDecorator extends graphics.BaseObject {
  constructor(baseObject){
    super(baseObject);
  }

  onKeyUp(){
    this.baseObject.onKeyUp();
  }

  onKeyDown(){
    this.baseObject.onKeyDown();
  }
}

let controller = (function(){

  class Controller extends BaseObjectDecorator {
    constructor(baseObject, keyList){
      super(baseObject);
      this.keyList = keyList;
    }

    onKeyUp(){
      this.baseObject.onKeyUp();
      console.log("WOOOOOOOOOOO");
    }

    onKeyDown(){

    }

  }



  return {
    Controller
  }

}());
