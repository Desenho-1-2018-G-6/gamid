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

    addKey(key,onKeyDown=function(){}, onKeyUp=function(){}){

      let hasKey = false;

      for(let i = 0; i < this.functionList.length; i++){
        if(key == this.functionList[i].key){
          hasKey = true;
          i = this.functionList.length;
        }
      }

      if(hasKey){
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
      // console.log("Controller");
    }

    onKeyDown() {
      super.onKeyDown();
      // console.log("Controller");
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
      // console.log("Keyboard");
      for (let i in functionList) {
        if (event.keyCode == functionList[i].key) {
          functionList[i].onKeyDownFunc();
        }
      }
    }

    onKeyUp(event, functionList) {
      super.onKeyUp();
      // console.log("Keyboard");
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
