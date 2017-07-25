define(['easeljs','SHLTextButton', 'GlobalData'], function(easeljs,SHLTextButton, GlobalData) {
    function MenuScene() {
        this.Container_constructor();

        this.gd = new GlobalData();
        this.startButton = new SHLTextButton("开始游戏", 200, 60, "#ffffff", 38, "#00cfef", "#0093d9");
        this.startButton.x = (this.gd.canvas.width - 200) / 2;
        this.startButton.y = this.gd.canvas.height / 2 - 120;
        this.startButton.on("click", this.onStartButton, this);
        this.addChild(this.startButton);

        this.settingButton = new SHLTextButton("设置", 160, 50, "#ffffff", 34, "#00cfef", "#0093d9");
        this.settingButton.x = (this.gd.canvas.width - 160) / 2;
        this.settingButton.y = this.gd.canvas.height / 2 - 40;
        this.settingButton.on("click", this.onSetting, this);
        this.addChild(this.settingButton);

        this.introductionButton = new SHLTextButton("说明", 160, 50, "#ffffff", 34, "#00cfef", "#0093d9");
        this.introductionButton.x = (this.gd.canvas.width - 160) / 2;
        this.introductionButton.y = this.gd.canvas.height / 2 + 30;
        this.introductionButton.on("click", this.onIntroduction, this);
        this.addChild(this.introductionButton);
    }

    var p = createjs.extend(MenuScene, createjs.Container);

    p.onStartButton = function(e) {
        this.dispatchEvent(new createjs.Event("restart"));
    };

    p.onSetting = function(e) {
        this.dispatchEvent(new createjs.Event("setting"));
    };

    p.onIntroduction = function(e) {
        this.dispatchEvent(new createjs.Event("introduction"));
    }

    MenuScene = createjs.promote(MenuScene, "Container");

    return MenuScene;
});
