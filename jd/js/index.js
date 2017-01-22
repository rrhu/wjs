//页面加载完成
window.onload=function(){
    search();
    banner();
    downTime();
}

//头部搜索功能
function search(){
    //获取搜索框的对象
    var header_box=document.querySelector(".jd_header_box");
    //获取banner的对象
    var jd_banner=document.querySelector(".jd_banner");
//     获取banner对象自己的高度
    var height=jd_banner.offsetHeight;
    //监听滚动事件
    window.onscroll=function(){
        //被卷起的头部
        var top=document.body.scrollTop;
        var opacity = 0;
        if(top>height){
            opacity = 0.85;
        }
        else{
            opacity=0.85*(top/height);
        }
        header_box.style.background="rgba(201,21,35,"+opacity+")";
    }
}

//轮播图 banner
function banner(){
    //获取最大盒子的对象，以及他的宽度
    var bannerBox=document.querySelector(".jd_banner");
    var width=bannerBox.offsetWidth;
    //获取图片ul的对象
    var imageBox=bannerBox.querySelector("ul:nth-child(1)");
    //获取原点盒子对象
    var pointBox=bannerBox.querySelector("ul:nth-child(2)");
    //获取原点的对象
    var points=pointBox.querySelectorAll("li");
   //做动画，用setInterval();
    //自定义index=1；
    //由于banner动画需要添加和去除过度的比较多，所以给单独封装一下
    //添加过渡
    var addTransition=function(){
        imageBox.style.transition="all .2s";
        //存在兼容问题
        imageBox.style.webkitTransition="all .2s";
    };
    //去除过度
    var removeTransition=function(){
        imageBox.style.transition="none";
        //存在兼容问题
        imageBox.style.webkitTransition="none";
    };
    //设置定位
    var setTranslateX=function(x){
        imageBox.style.transform="translateX("+x+"px)";
        imageBox.style.webkitTransform="translateX("+x+"px)";
    };
    var index=1;
    var timer=setInterval(function(){
        index++;
        //用过度来做动画
        addTransition();
        //设置定位
       setTranslateX(-index*width);
    },3000);
    //添加过渡结束监听事件,又由于过渡结束时间存在兼容问题，一个加webkit，一个不加，这样的话，又增加了代码量，所以我们把兼容和不兼容封装一起再使用这个监听事件，即就是common里的itcast.transitionEnd（）方法；
    itcast.transitionEnd(imageBox,function(){
        if(index>=9){
            //如果index=9的时候，就需要瞬间跳转到指定的索引值，不需要动画了，所以要取消动画；
            index=1;
            //清除过渡
            removeTransition();
            //设置定位
            setTranslateX(-index*width);
        }
        else if(index<=0){
            index=8;
            //清除过渡
            removeTransition();
            //设置定位
            setTranslateX(-index*width);
        }
        /*设置当前的点*/
        setPoint();
    });
    //point圆点跟随, /*2.点随着图片轮播做改变  对应上当前的图片的位子*/
    /*第四步*/
    /*2.点随着图片轮播做改变  对应上当前的图片的位子*/
    var setPoint = function(){
        /*去除当前样式*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
        }
        /*索引值 0-9 */
        /*又需要判断index 是0 9的时候 */
        /*但是 我们设置点的  时候我们是在动画结束的时候设置*/
        /*我们的index已经重置过了*/
        /*没有必要 被重置过的index  1-8 */
        points[index-1].className = "now";
    }
    /*第五步*/
    /*3.图片盒子能滑动*/
    //设置触摸开始的初始值
    var startX=0;
    //设置移动时候的X坐标
    var moveX=0;
    //设置移动距离
    var distanceX=0;
    //判断是否滑动
    var isMove=false;
    //绑定事件
    imageBox.addEventListener("touchstart",function(e){
        //当手指放在动画上时清除定时器
        clearInterval(timer);
        //获取开始位置的X坐标
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        console.log(distanceX);
        //让轮播图跟着手指滑动
        //清除过渡
        removeTransition();
        //设置定位
        setTranslateX(-index*width+distanceX);
    });
    //在谷歌的模拟器会出现  一个问题就是  touchend的时候可能会丢失事件
    window.addEventListener("touchend",function(e){
        /*第六步*/
        /*
         * 4.当滑动的时候不超过一定的距离的时候  吸附回去
         * 5.当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
         * 一定的距离  就是1/3的图片的宽度
         * */
        if(Math.abs(distanceX)>(width/3) && isMove){
            if(distanceX>0){
                index--;
            }
            else{
                index++;
            }
            addTransition();
            setTranslateX(-index*width);
        }
        //如果不超过一定距离就吸附回去
        else{
            //添加过渡
            addTransition();
            setTranslateX(-index*width);
        }
        /*重置参数  防止第二次事件的时候影响计算*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        //当手松开的时候，要开启定时器,开启前还需要再清除一次，防止同时开启多次
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            //用过度来做动画
            addTransition();
            //设置定位
            setTranslateX(-index*width);
        },3000);

    });
}

//秒杀倒计时
function downTime(){
    var seckill_time=document.querySelector(".seckill-time");
    //获取所有的span
    var spans=seckill_time.querySelectorAll("span");

    //定义倒计时的时间
    var time=5*60*60;

    var timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            //一旦结束某个程序不想让它继续向下执行，就要写return false来结束执行
            return false;
        }
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;

        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;

        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000);
}
