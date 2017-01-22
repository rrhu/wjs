//����һ�����ﳵ����
function Cart(){
    //��Ʒ����
    this.sum = 0;
    /*��Ʒ�ܼ۸�*/
    this.price = 0;
    /*��Ʒ�б�*/
    this.products = [];
}
Cart.prototype = {
    /*��� �󶨻�����Ϣ*/
    bindBasic:function(){
        //�󶨲�Ʒ����
        $('.cartsum').html(this.getProductSum())
        /*���ܼ۸�*/
        $('.cartAllPrice').html(this.getProductPrices())
    },
    /*��� �󶨲�Ʒ�б�*/
    bindProductList:function(){
        var str = ''
        for(var i= 0,len=this.products.length;i<len;i++){
            var product = this.products[i]
            var image = product.images[0];
            str += "<div class='cart_box'>"
            str += "<div class='message'>"
            str += "<div class='alert-close'> </div>"
            str += "<div class='list_img'><img src='"+image.small+"' class='img-responsive' alt=''/></div>"
            str += "<div class='list_desc'><h4><a href='#'>"+product.name+"</a></h4>1 x<span class='actual'>$"+product.price+"</span></div>"
            str += "<div class='clearfix'></div>"
            str += " </div>"
            str += " </div>"
        }
        $('.shopping_cart').html(str)
    },
    /*����*/
    init:function(){
        this.bindBasic()
        this.bindProductList()
    },
    //�����Ʒ����
    getProductSum:function(){
        var sum = 0;
        if(this.products && this.products.length>=0){
            sum = this.products.length;
        }else{
            sum =  0
        }
        this.sum = sum;
        return sum;
    },
    //�����Ʒ�ܼ۸�
    getProductPrices:function(){
        var sum = 0;
        for(var i = 0,len = this.products.length;i<len;i++){
            var item = this.products[i]
            sum+= item.price
        }
        this.price = sum;
        return sum;
    }

}