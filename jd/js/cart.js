window.onload=function(){
    deleteBox();
    checkedBox();
};
function checkedBox(){
    var checkboxs=document.querySelectorAll(".jd_check_box");
    for(var i=0;i<checkboxs.length;i++){
        checkboxs[i].onclick=function(){
            if(this.getAttribute("checked")){
                this.removeAttribute("checked");
            }
            else{
                this.setAttribute("checked","checked");
            }
        }
    }

}
function deleteBox(){
//    �Ȼ�ȡ������Ĵ����
    var win=document.querySelector(".jd_win");
//    ��ȡ���������Ǹ��Ӻ��Ӷ���
    var runBox=win.querySelector(".jd_win_box");
//    ��ȡ���е�ɾ������󣬼�סҪ��ȡ���������all��
    var deletes=document.querySelectorAll(".delete_box");
    var deleteBox=null;
    for(var i=0;i<deletes.length;i++){
        deletes[i].onclick=function(e){
            win.style.display="block";
            runBox.className="jd_win_box bounceInDown";
            deleteBox=this;
            var deleteUp=deleteBox.querySelector("span:first-child");
            deleteUp.style.transition="all 1s";
            deleteUp.style.webkitTransition="all 1s";

            deleteUp.style.transform="rotate(-45deg) translateY(2px)";
            deleteUp.style.webkitTransform="rotate(-45deg) translateY(2px)";

            deleteUp.style.transformOrigin="0 5px";
            deleteUp.style.webkitTransformOrigin="0 5px";

        }
    }
    document.querySelector('.cancel').onclick=function(){
        /*3.���ȡ����ť��ʱ��  �رյ����� ɾ����ť�����رո���*/
        win.style.display="none";
            var deleteUp=deleteBox.querySelector("span:first-child");
            deleteUp.style.webkitTransform = "none";
            deleteUp.style.transform = "none";
    }

}