define(['easeljs','SHLTextButton', 'GlobalData'], function(easeljs,SHLTextButton, GlobalData) {
 function ResultScene(scroe)
    {
        this.Container_constructor();
        this.scroe=scroe;
        this.gd=new GlobalData();

        this.resultText=new createjs.Text("最终得分： "+scroe, "30px Microsoft Yahei", "#000000");
        this.resultText.textAlign="center";
        this.resultText.x=this.gd.canvas.width/2;
        this.resultText.y=this.gd.canvas.height/2-100;
        this.addChild(this.resultText);

        this.restartButton=new SHLTextButton("重新开始",180,50,"#ffffff",30,"#00cfef","#0093d9");
        this.restartButton.x=(this.gd.canvas.width-180)/2;
        this.restartButton.y=(this.gd.canvas.height-60)/2+10;
        this.restartButton.on("click",this.onRestart,this);
        this.addChild(this.restartButton);


        this.backButton=new SHLTextButton("返回",60,30,"#ffffff",14,"#00cfef","#0093d9");
        this.backButton.x=(this.gd.canvas.width-60)/2;
        this.backButton.y=(this.gd.canvas.height-30)/2+80;
        this.backButton.on("click",this.onBack,this);
        this.addChild(this.backButton);
    }
    var p=createjs.extend(ResultScene,createjs.Container);

    p.onBack=function(e)
    {
        this.dispatchEvent(new createjs.Event("backbutton"));
    };

    p.onRestart=function(e)
    {
        this.dispatchEvent(new createjs.Event("restart"));
    };

    p.setScroe=function(s)
    {
        this.resultText.text="最终得分： "+s;
    };

    ResultScene = createjs.promote(ResultScene,"Container");
   
    return ResultScene;
});