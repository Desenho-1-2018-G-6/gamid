class BaseObjectDecorator extends graphics.BaseObject {
  constructor(baseObject){
    this.baseObject = baseObject;
  }
}

let controller = (function(){

  class Controller {
    constructor(baseObject, keyList){
      this.baseObject = baseObject;
      this.keyList = keyList;
    }
  }

  return {
    Controller
  }

}());
