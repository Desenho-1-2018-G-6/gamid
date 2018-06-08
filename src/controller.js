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
          this.createOnKeyDownFunction();

          document.addEventListener("keyup", () => this.onKeyUp(event));
      }

      createOnKeyDownFunction(){
          let onKeyDown = new Function(
              'event',
              'keyList',
              'functionList',
              `

                  for (let i = 0; i < keyList.length; i++){
                      if (event.keyCode == keyList[i]){
                          functionList[i];
                      }
                  }
              `
          );

          document.addEventListener("keydown", () => onKeyDown(event,
                                                               this.keyList,
                                                               this.functionList));
      }

      createKeysFunction(){
          for (let i = 0; i < this.keyList.length; i++){
              let func = new Function();

              this.functionList.push(func);
          }
      }
  }

  return {
    Controller,
    Keyboard
  }

}());
