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
      // console.log("WOOOOOOOOOOO");
    }

    onKeyDown(){
      super.onKeyDown();
      console.log("WAAAAAAAAAAAAAA");
    }
  }

  class Keyboard extends Controller {
      constructor(baseObject, keyList){
          super(baseObject, keyList);
          this.baseObject = baseObject;
          this.functionList = [];
          this.createKeysFunction();
      }

      createKeysFunction(){
          for (let i = 0; i < this.keyList.length; i++){
              let obj = new Object();
              obj.key = this.keyList[i];
              obj.onKeyUpFunc = function(){};
              obj.onKeyDownFunc = function(){};
              this.functionList.push(obj);
          }

          document.addEventListener("keydown", () => this.onKeyDown(event, this.functionList));
          document.addEventListener("keyup", () => this.onKeyUp(event, this.functionList));
      }


      onKeyDown(event, functionList){
        for(let i in functionList){
          if(event.keyCode == functionList[i].key){
              functionList[i].onKeyDownFunc();
          }
        }
      }

      onKeyUp(event, functionList){
        for(let i in functionList){
          if(event.keyCode == functionList[i].key){
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
