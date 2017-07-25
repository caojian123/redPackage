define([], function() {
    function GlobalData() {
        // 舞台
        this.stage = '';
        // canvas元素
        this.canvas = '';
        this.scroe = ''; // 游戏的得分
        this.resource = ''; //游戏中用的的素材
        this.isSoundOn = true; //记录声音是否打开
        if (GlobalData._instance == null) {
            GlobalData._instance = this;
        }
        return GlobalData._instance;
    }

    return GlobalData;
});
