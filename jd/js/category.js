//入口函数
window.onload=function(){
    leftSwipe();
    rightSwipe();

}
/*
 * 1.菜单滑动起来
 * 2.当滑动到一定的距离的时候不能滑动  滑动区间
 * 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去
 * 4.点击菜单的时候  改变当前的样式
 * 5.点击菜单的时候  定位到当前的那个菜单到最顶部
 *   如果不满足定位区间就不做定位
 *   这里的核心点就是currY，记录每次移动后的Y坐标，贯穿整个案例，每次移动后，都要把移动到的值赋值给currY；
 * */
//左边菜单滑动
function leftSwipe(){
//    获取大盒子的对象
    var parentBox=document.querySelector(".jd_categroy_left");
    //    获取菜单栏里的ul对象
    var childBox=parentBox.querySelector("ul");
    //获取外侧大盒子的高度
    var parentHeight=parentBox.offsetHeight;
    //获取ul长盒子的高度
    var childHeight=childBox.offsetHeight;

    /*translateY 初始的定位 其实就是最大定位 0*/
    var maxY=0;
    /*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
    var minY=parentHeight-childHeight;
//    自定义缓冲的距离
    var distance=100;
    /*translateY 最大滑动定位*/
    var maxSwipe=maxY+100;
    /*translateY 最小滑动定位*/
    var minSwipe=minY-100;
//    设置初始化值
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var isMove=false;
//    记录当前的定位全局，相当于轮播图的index，我们在做slide轮播图时，用index*width来记录当前的值，再加上移动distance的值,就是现在所在的位置
    var currY=0;

    //定义公用的公式,首先要知道谁做动画，在这里是ul这个盒子来做动画，所以就设置它的过渡值和变化值
//    每次设置时，必须要注意兼容问题，加部分浏览器的前缀；
//    添加过渡
    var addTransition = function(){
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    };
    var removeTransition = function(){
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    };
    var setTranslateY = function(y){
        childBox.style.webkitTransform = "translateY("+y+"px)";
        childBox.style.transform = "translateY("+y+"px)";
    };
//    绑定事件
    childBox.addEventListener("touchstart",function(e){
    //    获取触摸开始的Y位置
        startY= e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove",function(e){
       moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if((currY+distanceY)<maxSwipe && (currY+distanceY)>minSwipe ){
            setTranslateY(currY+distanceY);
        }
    });
    window.addEventListener("touchend",function(e){
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        if((currY+distanceY)>maxY){
            currY=maxY;
            addTransition();
            setTranslateY(currY);
        }
        /*当往上滑的时候 小于 最小定位*/
        else if((currY+distanceY)<minY){
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }
        /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
        else {
            currY = currY + distanceY;
        }
        /*重置所有的参数  不重置currY */
        startY = 0;
        moveY =0;
        distanceY = 0;
        isMove = 0;
    });
//    绑定tap事件，先去common里封装一个tap事件，底层用的是touch事件来封装的，因为click事件在移动端会有300s的延迟，所以自己封装tap事件用
//    获取所有的li,一定要记得加All，不然只能获取第一个。
    var lis=childBox.querySelectorAll("li");
    itcast.tap(childBox,function(e){
    //       点击获取样式，首先需要清除所有li 的样式，再给当前的li添加类样式
        var li= e.target.parentNode;
        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            // 给lis数组自己添加index属性，并把当前的索引值赋值给index；此index只能被这个数组里面的元素调用;
            lis[i].index=i;
        }
        //获取点击事件源，因为li里面包裹的是a标签，所以我们点击的事件源是a，想要获得li，就是a 的父节点
        li.className="now";

        //点击后，将被点击的那个事件源跳转到第一个位置，判断如果点击位置的height*index大于最小的minY值，就跳转，否则不跳转
        //因为点击以后位置是向上走，所以是负数，就要在索引*每个li的高度50前面加上负号；
        var translateY=-li.index*50;
        if(translateY>minY){
            //由于currY贯穿整个案例，所以每次移动后要把移动的位置赋值给currY。
            currY=translateY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }

    });
}
//右侧内容滑动，左侧是自己纯js代码，右侧内容用的是插件swipe.js，直接传入参数就可以滑动
function rightSwipe(){
    /*通过封装的swipe插件来实现*/
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),/*父容器对象*/
        swipeType:'y',/*滑动 的方向*/
        swipeDistance:100 /*缓冲的距离*/
    });
}