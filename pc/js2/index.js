/*ģ���Ʒ����*/
var cart = new Cart()
var hm  = new Product(cart)

hm.name = 'HM���з���ɽ��33'
hm.description = '�����ģ������ģ���ɽһ��������һ������ã��Һã���Ҳ�ã�̫���ˣ�һ�����������������'
hm.price = 600
hm.tuangouPrice = 550
hm.sum = 100

hm.images=[
    {small:'images/s11.jpg',big:'images/s11.jpg'},
    {small:'images/s12.jpg',big:'images/s12.jpg'},
    {small:'images/s13.jpg',big:'images/s13.jpg'}
]
hm.init()


//ģ�⹺�ﳵ���� ģ�⹺�ﳵ������������Ʒ
cart.products.push(hm)
cart.products.push(hm)
cart.products.push(hm)

//ʹ�ö�����   - ���������
cart.init()


