let audio = (function () {

  class Audio extends BaseObjectDecorator {
    constructor(baseObject, fileList){
      super(baseObject);
      this.fileList = fileList;
      this.soundList = [];
      this.addAudio(fileList);
    }

    addAudio(fileList){
      for(let i in fileList){
        let sound = document.createElement("audio");
        this.createAudio(sound, fileList[i]);
        this.soundList.push(sound);
      }
    }

    createAudio(sound, soundName){
        sound.src = soundName;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("control", "none");
        sound.style.display = "none";
        // sound.accessKey = fileList[i];
        document.body.appendChild(sound);
    }

    play(soundName){
      for(let i in this.soundList){
        if(this.soundList[i].attributes.src.nodeValue === soundName){
          this.soundList[i].loop = false;
          this.soundList[i].play();
        }
      }
    }

    pause(soundName){
      for(let i in this.soundList){
        if(this.soundList[i].attributes.src.nodeValue === soundName){
          this.soundList[i].pause();
        }
      }
    }

    loop(soundName){
        for(let i in this.soundList){
          if(this.soundList[i].attributes.src.nodeValue === soundName){
            this.soundList[i].loop = true;
            this.soundList[i].play();
          }
        }
    }

    stop(soundName){
        for(let i in this.soundList){
            if(this.soundList[i].attributes.src.nodeValue === soundName){
                this.soundList[i].pause();
                this.soundList[i].currentTime = 0;
            }
        }
    }
  }

  return {
    Audio
  }

}());
