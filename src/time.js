let time = (function () {
    class Time {
        constructor() {
            this.lastUpdate = 0;
            this.objects = gamid.graphics.objects;
            this.canvasList = gamid.graphics.canvasList;
        }

        setTime() {
            let that = this;
            this.lastUpdate = Date.now();
            setInterval(() => this.loop(), 16.6667);
        }

        loop() {
            let now = Date.now();
            let dt = now - this.lastUpdate;
            this.lastUpdate = now;
            this.updateGame(dt);
        }

        updateGame(dt) {
            for (let i in this.canvasList) {
                // clear all canvasList
                let ctx = this.canvasList[i].element.getContext('2d');
                ctx.clearRect(0, 0, this.canvasList[i].width, this.canvasList[i].height);
                this.canvasList[i].setBackgroundColor(this.canvasList[i].color);

                // move all objects
                for (let j in this.canvasList[i].objects) {
                    this.canvasList[i].objects[j].newPosition(dt / 1000); // delta time in seconds
                    this.canvasList[i].objects[j].update();
                }

                // show fps
                ctx.fillStyle = 'black';
                ctx.fillText('fps:' + parseFloat(1/(dt/1000)).toFixed(2) + 'ms', 5, 10);
            }

        }

    }

    new Time().setTime();
    
}());