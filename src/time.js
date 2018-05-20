let time = (function(){
        let lastUpdate = 0;
        let setTime = function(){
            lastUpdate = Date.now();  
            setInterval(loop, 16.6667);
        }

        
        function loop(){
            let now = Date.now();
            let dt = now - lastUpdate;
            lastUpdate = now;
            updateGame(dt);
        }

        function updateGame(dt){
            let objects = gamid.graphics.objects;
            let canvasList = gamid.graphics.canvasList;
            // clear all canvas
            for(let i in canvasList){
                let ctx = canvasList[i].getContext('2d');
                ctx.clearRect(0, 0, canvasList[i].width, canvasList[i].height);
                gamid.graphics.setBackgroundColor(canvasList[i], canvasList[i].color);

                ctx.fillStyle = 'black';
                ctx.fillText('fps:' + dt + 'ms', 5, 10);
            }

            // move all objects
            for (let i in objects) {
                objects[i].newPosition(dt/1000); // delta time in seconds
                objects[i].update();
            }
        }

    return {
        setTime
    }
}());