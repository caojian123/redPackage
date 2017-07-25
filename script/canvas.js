define([],function(){
    window.onresize=function(){
    //console.log("resize");
    var canvas=document.getElementById("gameView");//获取到canvas，也可以用document.getElementById("gameMain");
    //获取浏览器可是区域宽高；需要考虑不同浏览器的兼容问题，或者直接用jquary，这里只是给出个思路，没有考虑浏览器的兼容问题。
    //获取宽高对于不熟悉前端的人比较麻烦，各种兼容性问题，一定要多用百度
    //document.body.clientHeight可能会一直是0，自己百度解决
    canvas.style.position="absolute";//canvas用绝对定位
    var w=document.body.clientWidth;//获取浏览器可视区域的宽
    var h=document.body.clientHeight;//获取浏览器可视区域的高
   
    canvas.width=w;
    canvas.height=h;
  }
  window.onresize();//手动resize一次
})
