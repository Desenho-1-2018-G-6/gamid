let audio = (function () {

  class Audio extends BaseObjectDecorator {
    constructor(baseObject, fileList){
      super(baseObject);
      this.fileList = fileList;
      this.soundList = [];
      this.createAudios(fileList);
    }
  }

  return {
    Audio
  }

}());
