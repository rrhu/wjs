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
//    先获取弹出框的大盒子
    var win=document.querySelector(".jd_win");
//    获取做动画的那个子盒子对象
    var runBox=win.querySelector(".jd_win_box");
//    获取所有的删除框对象，记住要获取多个必须用all啊
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
        /*3.点击取消按钮的时候  关闭弹出框 删除按钮动画关闭盖子*/
        win.style.display="none";
            var deleteUp=deleteBox.querySelector("span:first-child");
            deleteUp.style.webkitTransform = "none";
            deleteUp.style.transform = "none";
    }

}