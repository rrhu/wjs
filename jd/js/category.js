//��ں���
window.onload=function(){
    leftSwipe();
    rightSwipe();

}
/*
 * 1.�˵���������
 * 2.��������һ���ľ����ʱ���ܻ���  ��������
 * 3.������������ʱ��  ��Ҫ�ж��Ƿ��ڶ�λ������  ����������ȥ  ��λ��ȥ
 * 4.����˵���ʱ��  �ı䵱ǰ����ʽ
 * 5.����˵���ʱ��  ��λ����ǰ���Ǹ��˵������
 *   ��������㶨λ����Ͳ�����λ
 *   ����ĺ��ĵ����currY����¼ÿ���ƶ����Y���꣬�ᴩ����������ÿ���ƶ��󣬶�Ҫ���ƶ�����ֵ��ֵ��currY��
 * */
//��߲˵�����
function leftSwipe(){
//    ��ȡ����ӵĶ���
    var parentBox=document.querySelector(".jd_categroy_left");
    //    ��ȡ�˵������ul����
    var childBox=parentBox.querySelector("ul");
    //��ȡ������ӵĸ߶�
    var parentHeight=parentBox.offsetHeight;
    //��ȡul�����ӵĸ߶�
    var childHeight=childBox.offsetHeight;

    /*translateY ��ʼ�Ķ�λ ��ʵ�������λ 0*/
    var maxY=0;
    /*translateY ������������Ķ�λ ��ʵ������С��λ �������߶�-�������߶�*/
    var minY=parentHeight-childHeight;
//    �Զ��建��ľ���
    var distance=100;
    /*translateY ��󻬶���λ*/
    var maxSwipe=maxY+100;
    /*translateY ��С������λ*/
    var minSwipe=minY-100;
//    ���ó�ʼ��ֵ
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var isMove=false;
//    ��¼��ǰ�Ķ�λȫ�֣��൱���ֲ�ͼ��index����������slide�ֲ�ͼʱ����index*width����¼��ǰ��ֵ���ټ����ƶ�distance��ֵ,�����������ڵ�λ��
    var currY=0;

    //���幫�õĹ�ʽ,����Ҫ֪��˭����������������ul��������������������Ծ��������Ĺ���ֵ�ͱ仯ֵ
//    ÿ������ʱ������Ҫע��������⣬�Ӳ����������ǰ׺��
//    ��ӹ���
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
//    ���¼�
    childBox.addEventListener("touchstart",function(e){
    //    ��ȡ������ʼ��Yλ��
        startY= e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove",function(e){
       moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        /*�������*/
        removeTransition();
        /*���ö�λ*/
        /*�ڶ��� 2.��������һ���ľ����ʱ���ܻ���  ��������*/
        /*��ǰҪ����λ��λ����Ҫ�ڻ���������*/
        if((currY+distanceY)<maxSwipe && (currY+distanceY)>minSwipe ){
            setTranslateY(currY+distanceY);
        }
    });
    window.addEventListener("touchend",function(e){
        /*�ڶ��� 3.������������ʱ��  ��Ҫ�ж��Ƿ��ڶ�λ������  ����������ȥ  ��λ��ȥ*/
        /*�����»���ʱ�� ���� ���λ*/
        if((currY+distanceY)>maxY){
            currY=maxY;
            addTransition();
            setTranslateY(currY);
        }
        /*�����ϻ���ʱ�� С�� ��С��λ*/
        else if((currY+distanceY)<minY){
            currY=minY;
            addTransition();
            setTranslateY(currY);
        }
        /*��¼��ǰ�Ķ�λ   ��һ�ε�ǰ�Ķ�λ + ��һ�θı�Ķ�λ*/
        else {
            currY = currY + distanceY;
        }
        /*�������еĲ���  ������currY */
        startY = 0;
        moveY =0;
        distanceY = 0;
        isMove = 0;
    });
//    ��tap�¼�����ȥcommon���װһ��tap�¼����ײ��õ���touch�¼�����װ�ģ���Ϊclick�¼����ƶ��˻���300s���ӳ٣������Լ���װtap�¼���
//    ��ȡ���е�li,һ��Ҫ�ǵü�All����Ȼֻ�ܻ�ȡ��һ����
    var lis=childBox.querySelectorAll("li");
    itcast.tap(childBox,function(e){
    //       �����ȡ��ʽ��������Ҫ�������li ����ʽ���ٸ���ǰ��li�������ʽ
        var li= e.target.parentNode;
        for(var i=0;i<lis.length;i++){
            lis[i].className=" ";
            // ��lis�����Լ����index���ԣ����ѵ�ǰ������ֵ��ֵ��index����indexֻ�ܱ�������������Ԫ�ص���;
            lis[i].index=i;
        }
        //��ȡ����¼�Դ����Ϊli�����������a��ǩ���������ǵ�����¼�Դ��a����Ҫ���li������a �ĸ��ڵ�
        li.className="now";

        //����󣬽���������Ǹ��¼�Դ��ת����һ��λ�ã��ж�������λ�õ�height*index������С��minYֵ������ת��������ת
        //��Ϊ����Ժ�λ���������ߣ������Ǹ�������Ҫ������*ÿ��li�ĸ߶�50ǰ����ϸ��ţ�
        var translateY=-li.index*50;
        if(translateY>minY){
            //����currY�ᴩ��������������ÿ���ƶ���Ҫ���ƶ���λ�ø�ֵ��currY��
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
//�Ҳ����ݻ�����������Լ���js���룬�Ҳ������õ��ǲ��swipe.js��ֱ�Ӵ�������Ϳ��Ի���
function rightSwipe(){
    /*ͨ����װ��swipe�����ʵ��*/
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),/*����������*/
        swipeType:'y',/*���� �ķ���*/
        swipeDistance:100 /*����ľ���*/
    });
}