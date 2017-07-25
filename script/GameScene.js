define(['easeljs','RedPackage','GlobalData','SHLTextButton'],function(easeljs,RedPackage,GlobalData,SHLTextButton){
 function GameScene() {
     //继承自Container类
     this.Container_constructor();
     this.score = 0;
     this.count = 8;
     this.startFlag = false;
     this.time = 10;
     this.timeBarContainer = new createjs.Container();
     this.timeBarContainer.x = 30;
     this.timeBarContainer.y = 25;
     this.addChild(this.timeBarContainer);
     this.timeBar = new createjs.Shape();

     this.scroeText = new createjs.Text("0", "16px Microsoft Yahei", "#000000");
     var scoreTitle = new createjs.Text("得分:", "16px Microsoft Yahei", "#000000");
     scoreTitle.x = 300;
     scoreTitle.y = 20;
     this.addChild(scoreTitle);
     this.scroeText.x = 340;
     this.scroeText.y = 20;
     this.addChild(this.scroeText);

     this.backButton = new SHLTextButton("返回", 60, 30, "#ffffff", 14, "#00cfef", "#0093d9");
     this.backButton.x = 700;
     this.backButton.y = 20;
     this.backButton.on("click", this.onBack, this);
     this.addChild(this.backButton);

     this.redContainer = new createjs.Container();
     this.addChild(this.redContainer);
     
     this.init();    
 }

 var p = createjs.extend(GameScene, createjs.Container);

 p.init = function() {
     var that = this;
     that.timeTick();
     that.initTimeBar();
     that.createRed();
 };
 p.createRed = function(){
     var that = this;
     var sum = that.redContainer.numChildren;
     if (sum == that.count) return;
     for (var i = sum; i < that.count; i++) {
         var red = new RedPackage();
         red.beginFall();
         that.bindEvent(red);
         that.redContainer.addChild(red);
     }
 };
 p.bindEvent = function(obj) {
     var that = this;
     obj.addEventListener('mousedown', function(e) {
         e.preventDefault();
         that.score += obj.money;
         that.updateScore();
         that.redContainer.removeChild(obj);
         that.createRed();
     });
 };
 p.timeTick = function(){
   var that = this;
    if (!that.startFlag) {
        var tickCount = 0;
        that.redFlag = true;
        var timer = setInterval(function() {  
            console.log("time:"+tickCount);
            if (that.time <= tickCount) {
               clearInterval(timer);
            } else{
                tickCount++;
                that.updateTickCount.call(that,tickCount);
            }

        }, 1000);
    }
 };
 p.initTimeBar = function() {
     var timeText = new createjs.Text("剩余时间", "14px Microsoft Yahei", "#000000");
     timeText.y = -5;
     this.timeBarContainer.addChild(timeText);
     var b = new createjs.Shape();
     b.x = 60;
     b.graphics.setStrokeStyle(1).beginStroke("#ff9999").beginFill("#ffffff");
     b.graphics.drawRect(0, 0, 180, 8);
     b.graphics.endFill();
     this.timeBarContainer.addChild(b);
     this.setTimerBar(1);
     this.timeBar.x = 60;
     this.timeBarContainer.addChild(this.timeBar);
 };

 p.setTimerBar = function(p) {
     this.timeBar.graphics.clear();
     this.timeBar.graphics.beginFill("#ff3333");
     this.timeBar.graphics.drawRect(1, 1, 178 * p, 6);
     this.timeBar.graphics.endFill();
 };

 p.updateTickCount = function(tickcount) {
     this.setTimerBar(1 - tickcount/this.time);
     if (tickcount >= this.time) {
         this.gameOver();
     }
 };

 p.updateScore = function() {
     var gd = new GlobalData();
     gd.scroe = this.score;
     this.scroeText.text = this.score;
 };

 p.gameOver = function() {
     this.isGameOver = true;
     this.dispatchEvent(new createjs.Event("gameover"));
 };

 p.onBack = function(e) {
     this.dispatchEvent(new createjs.Event("backbutton"));
 };

 GameScene = createjs.promote(GameScene, "Container");
 
 return GameScene;
});
