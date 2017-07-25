define(['easeljs'], function(easeljs) {
    function SHLTextButton(text, bwidth, bheight, textColor, fontsize, upColor, downColor) {
        this.Container_constructor();
        //要显示是文字
        this.buttonText = text; 
        //按钮的宽度
        this.bwidth = bwidth; 
        //按钮的高度
        this.bheight = bheight; 
        //文字的颜色
        this.textColor = textColor; 
        //文字的字体大小
        this.fontsize = fontsize; 
        //按钮正常状态的颜色
        this.upColor = upColor;
        //按钮按下的颜色 
        this.downColor = downColor; 
        //用于显示文字的Text
        this.labelText; 
        //用于显示背景的Shape
        this.bg; 
        //绘制Button
        this.drawButtton(); 
        //设置事件侦听
        this.setListener(); 
    }

    var p = createjs.extend(SHLTextButton, createjs.Container); 

    p.drawButtton = function() {
        this.removeAllChildren();
        //创建了text，并设置了对其方式和位置，这样就可以居中显示
        this.labelText = new createjs.Text(this.buttonText, this.fontsize + "px Microsoft YaHei", this.textColor);
        this.labelText.textAlign = "center";
        this.labelText.textBaseline = "middle";
        this.labelText.x = this.bwidth / 2;
        this.labelText.y = this.bheight / 2;

        //调用drawBG方法绘制了背景
        this.bg = new createjs.Shape();
        this.drawBG(this.upColor);
        this.addChild(this.bg);
        this.addChild(this.labelText);
    };

    //添加mousedown和pressup的事件侦听
    p.setListener = function() {
        this.on("mousedown", function(e) {
            this.drawBG(this.downColor);
        });
        this.on("pressup", function(e) {
            this.drawBG(this.upColor);
        });
    };

    //这个方法根据背景的颜色绘制了一个圆角矩形的背景
    p.drawBG = function(bgColor) {
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(bgColor);
        this.bg.graphics.drawRoundRect(0, 0, this.bwidth, this.bheight, 4, 4);
        this.bg.graphics.endFill();
    };

    SHLTextButton = createjs.promote(SHLTextButton, "Container");

    return SHLTextButton;
});
