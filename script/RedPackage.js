define(['easeljs', 'GlobalData'], function(easeljs, GlobalData) {
    function RedPackage() {
        this.Container_constructor();
        this.tickListener;
        this.speedX;
        this.speedY = Math.random() * 5 + 4;
        this.speedA = 4;
        this.gd = new GlobalData();

        var redPackage = new createjs.Bitmap(this.gd.resource.getResult("image1"));
        var minX = 10,
            maxX = window.innerWidth;
        this.money = parseInt(Math.random() * 100 + 1);
        
        redPackage.scaleX = 0.5;
        redPackage.scaleY = 0.5;
        this.x = minX + (maxX - minX) * Math.random();
        this.y = -redPackage.image.height * (Math.random() * 2 + 1);
        this.imageHeight = this.y;
        this.addChild(redPackage);
    }

    var p = createjs.extend(RedPackage, createjs.Container);

    //开始掉落
    p.beginFall = function() {
        var that = this;
        //添加tick事件侦听，tick事件大概相当于flash中enterFrame事件，在每次舞台更新的时候触发
        that.tickListener = createjs.Ticker.on("tick", this.fall, that);
        createjs.Ticker.setFPS(60); //设置帧频  
    };

    p.fall = function(e) {
        //this.x+=this.speedX;
        this.y += this.speedY;
        //this.speedY+=this.speedA;
        //在检查边界
        if (this.y > this.gd.canvas.height + 50) {
            if (this.parent != null) {
                /*this.parent.removeChild(this);
                this.off("tick",this.tickListener);*/
                this.y = this.imageHeight;
            }
        }
        this.gd.stage.update(e);
    };

    p.addEventListener('mousedown', function(e) {
        if (this.parent.parent != null) {
            this.parent.parent.score += this.money;
            this.parent.parent.updateScore();
            this.parent.removeChild(this);
        }
    });

    RedPackage = createjs.promote(RedPackage, "Container");

    return RedPackage;
});
