/**
 * Created by Yuki on 2018/7/29.
 */
var photo =document.getElementsByClassName("photo");
    window.onload = function (){
        waterfall();
        scrollTop();
        seTime();
        spanShow();
        window.onscroll=function() {
            input();
            scrollTop();
    }
};
//后台数据加载至前端
function input(){
    if(checkSlide) {
        var num =Math.floor((Math.random()*30)+1);
        var box =document.createElement('div');box.className='box';
        var pic = document.createElement('div');pic.className='pic';
        var img=document.createElement('img');
        var a =document.createElement('a');
        var span=document.createElement('div');span.className="span";
        var zi1=document.createElement('div');zi1.className="zi";
        var node1=document.createTextNode("点赞");
        var node2=document.createTextNode("收藏");
        var zi2=document.createElement('div');zi2.className="zi";
        img.src ='img/'+num+'.jpg';
        photo[0].appendChild(box);
        box.appendChild(pic);
        box.appendChild(span);
        span.appendChild(zi1);
        span.appendChild(zi2);
        zi1.appendChild(node1);
        zi2.appendChild(node2);
        pic.appendChild(a);
        a.appendChild(img);
        waterfall();
        spanShow();
    }
}
//检测是否符合加载数据的条件
function checkSlide(){
            var box = document.getElementsByClassName("box");
            var lastBoxH=Math.floor((box[box.length-1].offsetHeight)/2)+box[box.length-1].offsetTop;
            var scrollTop =document.body.scrollTop||document.documentElement.scrollTop;
            var pageH = document.body.offsetHeight||document.documentElement.offsetHeight;
            return (lastBoxH < scrollTop + pageH);
}
//瀑布流定位设置
function waterfall() {
    var photo =document.getElementsByClassName("photo");
    var box = document.getElementsByClassName("box");
    var boxW =box[0].offsetWidth;
    var pageW = document.documentElement.clientWidth;
    var cols = Math.floor(pageW / boxW);
    photo[0].style.cssText='width:'+cols*boxW+'px;margin:0 auto';
    var boxHeight = [];
    var min, index;
         for (var i = 0; i < box.length; i++) {
                 //第一行
              if (i < cols) {
                  boxHeight.push(box[i].offsetHeight);
                 }
                  //后面行
                else {
                   min = getMinHeight(boxHeight)[0];
                   index = getMinHeight(boxHeight)[1];
                   //设置绝对定位
                  box[i].style.position="absolute";
                 box[i].style.top =min+"px";
                 box[i].style.left = boxW*index+"px";
                  //每列高度
                  boxHeight[index]+=box[i].offsetHeight;
        }

    }
}
//求每行最低高度and s索引
function getMinHeight(arr){
    var index=0;
    var min=arr[0] ;
    for (i=0;i<arr.length;i++){
        if(arr[i]<min){
            min =arr[i];
            index=i;
        }
    }
    return [min,index]
}
// 回到顶部图编显示&隐藏
function scrollTop(){
    var scrollTop =document.body.scrollTop||document.documentElement.scrollTop;
    var pageH = document.body.offsetHeight||document.documentElement.offsetHeight;
    var top =  document.getElementById("top");
    if (scrollTop>pageH){
       top .style.display="inline-block";
        }
    else{
        top .style.display="none";
    }
}
//设置回到顶部定时器
function seTime() {
    var top = document.getElementById("top");
    top.onclick = function () {//赋值给变量ScrollTop则出现问题？？？
        timer = setInterval(function () {
            document.documentElement.scrollTop = document.body.scrollTop /= 2000;
            if (document.documentElement.scrollTop = document.body.scrollTop == 0) {
                clearInterval(timer);
            }
        }, 30);

    };
}
//图片下方点赞&收藏的显示&隐藏
function spanShow() {
    $(".box").hover(
        function () {
            $(this).css("box-shadow","0px 10px 15px #666666" );
            $(this).find(".span").css("display", "inline-block");
            $(this).find(".zi").click(function(){
                $(this).css({"font-size":"15px","color":"#F1C908"})
            })
        },
        function () {
            $(this).css("box-shadow","none" );
            $(this).find(".span").css("display","none")
        }
    );

}
