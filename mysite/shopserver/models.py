from django.db import models
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()
# User._meta.get_field('email')._unique= True
# User._meta.get_field('phone')._unique= True


class SizeProduct(models.Model):
    size = models.IntegerField(verbose_name='Размер')
    title = models.CharField(max_length=150, verbose_name='Размер в буквах')

    def __str__(self):
        return '{} - {}'.format(self.size, self.title)

    class Meta:
        verbose_name = 'Размер товара'
        verbose_name_plural = 'Размеры товара'


class MyFloor(models.Model):
    title = models.CharField(max_length=150, verbose_name='Пол')
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Пол'
        verbose_name_plural = 'Пол'

    def get_absolute_url(self):
        return reverse('floor', kwargs={'slug': self.slug})


class Category(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название категории')
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def get_absolute_url(self):
        return reverse('category', kwargs={'slug': self.slug})


class Collection(models.Model):

    title = models.CharField(max_length=150, verbose_name='Название коллекции', default='Новая коллекция')
    status = models.CharField(max_length=150, verbose_name='Название коллекции', default='new collection')
    image = models.ImageField(verbose_name='изображение коллекции', upload_to='photos/%Y/%m/%d', blank=True)
    is_published = models.BooleanField(default=True, verbose_name='Публикация')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    products = models.ManyToManyField('Product', blank=True, related_name='related_product')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'
        ordering = ['created_at']


class Product(models.Model):

    title = models.CharField(max_length=150, verbose_name='Название товара')
    description = models.TextField(verbose_name='Описание товара', null=True, blank=True)
    image = models.ImageField(verbose_name='Превью товара', upload_to='photos/%Y/%m/%d', blank=True)
    size = models.ManyToManyField(SizeProduct, verbose_name='Размер', blank=True)
    is_published = models.BooleanField(default=True, verbose_name='Публикация')
    price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Цены')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    floor = models.ForeignKey(MyFloor, verbose_name='Пол', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, verbose_name='Категория', on_delete=models.CASCADE)
    discount = models.IntegerField(verbose_name='Скидка', null=True, blank=True, default=0)
    final_price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Финальная цена', null=True, blank=True)
    quantity = models.IntegerField(verbose_name='Количество товара', default=1)

    def save(self, *args, **kwargs):
        if self.discount:
            self.final_price = int(self.price) - int(self.price)*self.discount/100
        else:
            self.final_price = self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-created_at']


class CartProduct(models.Model):
    user = models.ForeignKey('Customer', verbose_name='Покупатель', on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart', verbose_name='Корзина', on_delete=models.CASCADE, related_name='related_products')
    content_object = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)
    final_price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Общая цена')
    size = models.ForeignKey(SizeProduct, null=True, verbose_name='Размер', on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return "Продукт: {} (для корзины)".format(self.content_object.title)

    class Meta:
        verbose_name = 'Товар(в корзине)'
        verbose_name_plural = 'Товары(в корзине)'
        ordering = ['-id']

    def save(self, *args, **kwargs):
        # self.size = self.content_object.size.first()
        self.final_price = self.qty * self.content_object.final_price
        super().save(*args, **kwargs)


class Cart(models.Model):
    owner = models.ForeignKey('Customer', null=True, verbose_name='Владелец', on_delete=models.CASCADE)
    product = models.ManyToManyField(CartProduct, blank=True, related_name='related_cart')
    total_products = models.PositiveIntegerField(default=0)
    final_price = models.DecimalField(max_digits=9, default=0, decimal_places=2, verbose_name='Общая цена')
    in_order = models.BooleanField(default=False)
    for_anonymous_user = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
        # ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if self.id:
            self.total_products = self.product.count()
            self.final_price = sum([cpoduct.final_price for cpoduct in self.product.all()])
        super().save(*args, **kwargs)


class Customer(models.Model):
    user = models.OneToOneField(User, verbose_name='Пользователь', on_delete=models.CASCADE)
    phone = models.CharField(max_length=30, verbose_name='Номер телефона', null=True, blank=True)
    address = models.CharField(max_length=255, verbose_name='Адрес', null=True, blank=True)
    orders = models.ManyToManyField('Order', blank=True, verbose_name='Заказы покупателя', related_name='related_customer')

    def __str__(self):
        if not (self.user.first_name and self.user.last_name):
            return self.user.username
        return 'Покупатель: {} {}'.format(self.user.first_name, self.user.last_name)

    class Meta:
        verbose_name = 'Покупатель'
        verbose_name_plural = 'Покупатели'


class Order(models.Model):

    STATUS_NEW = 'new'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_READY = 'is_ready'
    STATUS_COMPLETED = 'completed'
    STATUS_PAYED = 'payed'

    BUYING_TYPE_SELF = 'self'
    BUYING_TYPE_DELIVERY = 'delivery'

    STATUS_CHOICES = (
        (STATUS_PAYED, 'Заказ оплачен'),
        (STATUS_NEW, 'Новый заказ'),
        (STATUS_IN_PROGRESS, 'Заказ в процессе'),
        (STATUS_READY, 'Заказ готов'),
        (STATUS_COMPLETED, 'Заказ выполнен')

    )

    BUYING_TYPE_CHOICES = (
        (BUYING_TYPE_SELF, 'Самовывоз'),
        (BUYING_TYPE_DELIVERY, 'Доставка')
    )

    customer = models.ForeignKey(Customer, verbose_name='Покупатель', related_name='related_orders', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, verbose_name='Корзина', on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=255, verbose_name='Имя')
    last_name = models.CharField(max_length=255, verbose_name='Фамилия')
    phone = models.CharField(max_length=30, verbose_name='Телефон')
    address = models.CharField(max_length=1024, verbose_name='Адрес', null=True, blank=True)
    status = models.CharField(
        max_length=100,
        verbose_name='Статус заказа',
        choices=STATUS_CHOICES,
        default=STATUS_NEW
    )
    comment = models.TextField(verbose_name='Коментарий к заказу', null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата создания заказа')
    order_date = models.DateField(verbose_name='Дата получения заказа', default=timezone.now)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'