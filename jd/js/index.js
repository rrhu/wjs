//ҳ��������
window.onload=function(){
    search();
    banner();
    downTime();
}

//ͷ����������
function search(){
    //��ȡ������Ķ���
    var header_box=document.querySelector(".jd_header_box");
    //��ȡbanner�Ķ���
    var jd_banner=document.querySelector(".jd_banner");
//     ��ȡbanner�����Լ��ĸ߶�
    var height=jd_banner.offsetHeight;
    //���������¼�
    window.onscroll=function(){
        //�������ͷ��
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

//�ֲ�ͼ banner
function banner(){
    //��ȡ�����ӵĶ����Լ����Ŀ��
    var bannerBox=document.querySelector(".jd_banner");
    var width=bannerBox.offsetWidth;
    //��ȡͼƬul�Ķ���
    var imageBox=bannerBox.querySelector("ul:nth-child(1)");
    //��ȡԭ����Ӷ���
    var pointBox=bannerBox.querySelector("ul:nth-child(2)");
    //��ȡԭ��Ķ���
    var points=pointBox.querySelectorAll("li");
   //����������setInterval();
    //�Զ���index=1��
    //����banner������Ҫ��Ӻ�ȥ�����ȵıȽ϶࣬���Ը�������װһ��
    //��ӹ���
    var addTransition=function(){
        imageBox.style.transition="all .2s";
        //���ڼ�������
        imageBox.style.webkitTransition="all .2s";
    };
    //ȥ������
    var removeTransition=function(){
        imageBox.style.transition="none";
        //���ڼ�������
        imageBox.style.webkitTransition="none";
    };
    //���ö�λ
    var setTranslateX=function(x){
        imageBox.style.transform="translateX("+x+"px)";
        imageBox.style.webkitTransform="translateX("+x+"px)";
    };
    var index=1;
    var timer=setInterval(function(){
        index++;
        //�ù�����������
        addTransition();
        //���ö�λ
       setTranslateX(-index*width);
    },3000);
    //��ӹ��ɽ��������¼�,�����ڹ��ɽ���ʱ����ڼ������⣬һ����webkit��һ�����ӣ������Ļ����������˴��������������ǰѼ��ݺͲ����ݷ�װһ����ʹ����������¼���������common���itcast.transitionEnd����������
    itcast.transitionEnd(imageBox,function(){
        if(index>=9){
            //���index=9��ʱ�򣬾���Ҫ˲����ת��ָ��������ֵ������Ҫ�����ˣ�����Ҫȡ��������
            index=1;
            //�������
            removeTransition();
            //���ö�λ
            setTranslateX(-index*width);
        }
        else if(index<=0){
            index=8;
            //�������
            removeTransition();
            //���ö�λ
            setTranslateX(-index*width);
        }
        /*���õ�ǰ�ĵ�*/
        setPoint();
    });
    //pointԲ�����, /*2.������ͼƬ�ֲ����ı�  ��Ӧ�ϵ�ǰ��ͼƬ��λ��*/
    /*���Ĳ�*/
    /*2.������ͼƬ�ֲ����ı�  ��Ӧ�ϵ�ǰ��ͼƬ��λ��*/
    var setPoint = function(){
        /*ȥ����ǰ��ʽ*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
        }
        /*����ֵ 0-9 */
        /*����Ҫ�ж�index ��0 9��ʱ�� */
        /*���� �������õ��  ʱ���������ڶ���������ʱ������*/
        /*���ǵ�index�Ѿ����ù���*/
        /*û�б�Ҫ �����ù���index  1-8 */
        points[index-1].className = "now";
    }
    /*���岽*/
    /*3.ͼƬ�����ܻ���*/
    //���ô�����ʼ�ĳ�ʼֵ
    var startX=0;
    //�����ƶ�ʱ���X����
    var moveX=0;
    //�����ƶ�����
    var distanceX=0;
    //�ж��Ƿ񻬶�
    var isMove=false;
    //���¼�
    imageBox.addEventListener("touchstart",function(e){
        //����ָ���ڶ�����ʱ�����ʱ��
        clearInterval(timer);
        //��ȡ��ʼλ�õ�X����
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener("touchmove",function(e){
        isMove=true;
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        console.log(distanceX);
        //���ֲ�ͼ������ָ����
        //�������
        removeTransition();
        //���ö�λ
        setTranslateX(-index*width+distanceX);
    });
    //�ڹȸ��ģ���������  һ���������  touchend��ʱ����ܻᶪʧ�¼�
    window.addEventListener("touchend",function(e){
        /*������*/
        /*
         * 4.��������ʱ�򲻳���һ���ľ����ʱ��  ������ȥ
         * 5.�������ľ��볬����һ���ľ����ʱ��  ͼƬ����Ӧ�Ĺ���  �����
         * һ���ľ���  ����1/3��ͼƬ�Ŀ��
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
        //���������һ�������������ȥ
        else{
            //��ӹ���
            addTransition();
            setTranslateX(-index*width);
        }
        /*���ò���  ��ֹ�ڶ����¼���ʱ��Ӱ�����*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        //�����ɿ���ʱ��Ҫ������ʱ��,����ǰ����Ҫ�����һ�Σ���ֹͬʱ�������
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            //�ù�����������
            addTransition();
            //���ö�λ
            setTranslateX(-index*width);
        },3000);

    });
}

//��ɱ����ʱ
function downTime(){
    var seckill_time=document.querySelector(".seckill-time");
    //��ȡ���е�span
    var spans=seckill_time.querySelectorAll("span");

    //���嵹��ʱ��ʱ��
    var time=5*60*60;

    var timer=setInterval(function(){
        time--;
        if(time<0){
            clearInterval(timer);
            //һ������ĳ��������������������ִ�У���Ҫдreturn false������ִ��
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
