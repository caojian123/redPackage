requirejs.config({
    baseUrl: './script/',
    paths: {
        canvas: 'canvas',
        easeljs: 'lib/EaselJS/lib/easeljs-0.8.2.combined',
        tweenjs: 'lib/TweenJS/lib/tweenjs-NEXT.combined',
        soundjs: 'lib/soundjs-0.6.2.min',
        preloadjs: 'lib/preloadjs-0.6.2.min',
        GlobalData: 'GlobalData',
        RedPackage: 'RedPackage',
        SHLTextButton: 'SHLTextButton',
        GameScene: 'GameScene',
        ResultScene: 'ResultScene',
        MenuScene: 'MenuScene'
    }
});

require(['canvas', 'easeljs', 'tweenjs', 'soundjs', 'preloadjs', 'GlobalData', 'GameScene', 'ResultScene', 'MenuScene'],
    function(canvas, easeljs, tweenjs, soundjs, preloadjs, GlobalData, GameScene, ResultScene, MenuScene) {
        var app = {
            init: function() {
                this.menuScene = null;
                this.resultScene = null;
                var stage = new createjs.Stage("gameView");
                if (createjs.Touch.isSupported()) {
                    createjs.Touch.enable(stage);
                }
                this.gd = new GlobalData();
                this.gd.stage = stage;
                this.gd.canvas = stage.canvas;

                this.stage = stage;
                this.render();
            },
            render: function() {
                var that = this;
                that.preload(function() {
                    that.initMenu();
                    that.stage.update();
                });

            },
            preload: function(resourceComplete) {
                var that = this;
                //预加载
                var resource = new createjs.LoadQueue(false, '../assets/');
                //声音资源加载太慢
               // resource.installPlugin(createjs.Sound);

                resource.loadManifest([
                    { "src": "redpack.png", "id": "image1" }
                   /* { "src": "sounds/victory.mp3", "id": "wrongSound" }*/
                   /* { "src": "sounds/boom.mp3", "id": "rightSound" }*/
                ]);

                //文件加载进程
                resource.on("progress", function() {
                    document.querySelector("#load-msg").innerText = "加载中" + parseInt(resource.progress * 100) + "%...";
                    //加载完成把进度条隐藏
                    if (parseInt(resource.progress * 100) === 100) {
                        document.querySelector("#load-msg").style.display = "none";
                    }
                    console.log("Progress:", parseInt(resource.progress * 100), event.progress);
                });

                //文件加载完成执行
                resource.addEventListener("complete", function() {
                    console.log("加载完成，游戏开始!");
                    //createjs.Sound.play("victory");
                    that.gd.resource = resource;
                    resourceComplete.call(that);
                });
            },
            initMenu: function() {
                var that = this;
                if (that.resultScene) {
                    that.resultScene.parent.removeChild(that.resultScene);
                }
                if (that.menuScene == null) {
                    that.menuScene = new MenuScene();
                    that.menuScene.on("restart", that.onRestart, that);
                    //that.menuScene.on("setting", that.onSetting);
                    // that.menuScene.on("introduction", that.onIntroduction);
                }

                that.stage.addChild(that.menuScene);
            },
            onRestart: function() {
                console.log("restart");
                var that = this;
                if (that.menuScene.parent != null) {
                    that.menuScene.parent.removeChild(that.menuScene);
                }
                if (that.resultScene != null && that.resultScene.parent != null) {
                    that.resultScene.parent.removeChild(that.resultScene);
                }
                this.stage.update();
                that.initGame();
            },
            initResult: function() {
                var that = this;
                if (this.resultScene != null) {
                    this.resultScene.setScroe(this.gd.scroe);
                } else {
                    this.resultScene = new ResultScene(this.gd.scroe);
                    this.resultScene.on("backbutton", this.initMenu, that);
                    this.resultScene.on("restart", this.onRestart, that);
                }
                this.stage.addChild(this.resultScene);
            },
            initGame: function() {
                var that = this;
                if (that.gameScene != null) {
                    that.gameScene = null;
                }
                that.gameScene = new GameScene();
                that.gameScene.on("gameover", that.onGameOver, that);
                // that.gameScene.on("backbutton", onBack);
                that.gd.scroe = 0;
                that.stage.addChild(that.gameScene);
                that.stage.update();
            },
            onBack: function() {

            },

            onGameOver: function() {
                var that = this;
                console.log("gameOver");
                if (that.gameScene != null && that.gameScene.parent != null) {
                    that.gameScene.parent.removeChild(that.gameScene);
                    that.gameScene = null;
                }
                that.initResult();
                that.stage.update();
            }
        }

        app.init();
    });
