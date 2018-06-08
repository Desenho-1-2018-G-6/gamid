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

  class Keyboard extends Controller {
      constructor(baseObject, keyList){
          super(baseObject, keyList);
          this.baseObject = baseObject;

          document.addEventListener("keydown", () => this.onKeyDown(event));
          document.addEventListener("keyup", () => this.onKeyUp(event));
      }

      onKeyUp(event){
          super.onKeyUp();

      }

      onKeyDown(event){
          super.onKeyDown();
      }
  }

  return {
    Controller
  }

}());
