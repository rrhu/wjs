//����һ����Ʒ����
function Product(cart){
    //����
    this.name = '';
    /*����*/
    this.description = '';
    /*ԭ��*/
    this.price = 0;
    /*�Ź��۸�*/
    this.tuangouPrice = 0;
    /*��������*/
    this.sum = 0;
    //��Ϊ�ҵĲ�Ʒ������Ҫʹ������������ô��ô���أ��ҿ���ͨ���������ݽ���
    this.cart = cart;
    /*ͼƬ�б�*/
    this.images = [{small:'',big:''},{small:'',big:''},{small:'',big:''}]
}
Product.prototype = {
    //�󶨻�����Ϣ
    bindDOMDetail:function() {
        var str = ''
        str+='<h1 id="pname">'+this.name+'</h1>'
        str+='<ul class="rating">'
        str+=' <li><a class="product-rate" href="#"> </a> <span> </span></li>'
        str+='<li><a href="#" id="buyCount">'+this.sum+'</a>�˹���</li>'
        str+='<div class="clearfix"></div>'
        str+=' </ul>'
        str+='<div class="price_single">'
        str+='<span class="reducedfrom" id="price">$'+this.price+'</span>'
        str+=' <span class="actual" id="groupPrice">$'+this.tuangouPrice+'</span><a href="#">�Ź�</a>'
        str+=' </div>'
        str+=' <h2 class="quick">����:</h2>'
        str+=' <p class="quick_desc" id="description">'+this.description+'</p>'
        $('.pdetail').html(str)
    },
    /*��ͼƬ*/
    bindDOMImages:function() {
        var str =''

        for(var i=0;i<this.images.length;i++){
            var item = this.images[i]
            str+=' <li>'
                str+='<img class="etalage_thumb_image" src="'+item.small+'" class="img-responsive" />'
                str+='<img class="etalage_source_image" src="'+item.big+'" class="img-responsive" />'
            str+='</li>'
        }
         $('.etalage').html(str)


        /*jquery���ʵ�ֵĻõ�Ƭ��Ч*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
    /*���¼�*/
    bindEvents:function() {
        var that = this;
        $('#btnaddcart').click(function(){
            //����ǰ��Ʒ��ӵ����ﳵ����
            that.cart.products.push(that)
            //���°󶨹��ﳵ
            that.cart.init()
            //�ص�����
            $(window).scrollTop(0);
        })

    },
    //����
    init:function() {
        this.bindDOMDetail()
        this.bindDOMImages()
        this.bindEvents()
    }
}