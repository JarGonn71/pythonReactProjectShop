# Generated by Django 3.2.6 on 2021-08-23 17:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_products', models.PositiveIntegerField(default=0)),
                ('final_price', models.DecimalField(decimal_places=2, default=0, max_digits=9, verbose_name='Общая цена')),
                ('in_order', models.BooleanField(default=False)),
                ('for_anonymous_user', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Корзина',
                'verbose_name_plural': 'Корзины',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Название категории')),
                ('slug', models.SlugField(unique=True)),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=30, null=True, verbose_name='Номер телефона')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Адрес')),
            ],
            options={
                'verbose_name': 'Покупатель',
                'verbose_name_plural': 'Покупатели',
            },
        ),
        migrations.CreateModel(
            name='MyFloor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Пол')),
                ('slug', models.SlugField(unique=True)),
            ],
            options={
                'verbose_name': 'Пол',
                'verbose_name_plural': 'Пол',
            },
        ),
        migrations.CreateModel(
            name='SizeProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.IntegerField(verbose_name='Размер')),
                ('title', models.CharField(max_length=150, verbose_name='Размер в буквах')),
            ],
            options={
                'verbose_name': 'Размер товара',
                'verbose_name_plural': 'Размеры товара',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Название товара')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание товара')),
                ('image', models.ImageField(blank=True, upload_to='photos/%Y/%m/%d', verbose_name='Превью товара')),
                ('is_published', models.BooleanField(default=True, verbose_name='Публикация')),
                ('price', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='Цены')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('discount', models.IntegerField(blank=True, default=0, null=True, verbose_name='Скидка')),
                ('final_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True, verbose_name='Финальная цена')),
                ('quantity', models.IntegerField(default=1, verbose_name='Количество товара')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopserver.category', verbose_name='Категория')),
                ('floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopserver.myfloor', verbose_name='Пол')),
                ('size', models.ManyToManyField(blank=True, to='shopserver.SizeProduct', verbose_name='Размер')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=255, verbose_name='Фамилия')),
                ('phone', models.CharField(max_length=30, verbose_name='Телефон')),
                ('address', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Адрес')),
                ('status', models.CharField(choices=[('payed', 'Заказ оплачен'), ('new', 'Новый заказ'), ('in_progress', 'Заказ в процессе'), ('is_ready', 'Заказ готов'), ('completed', 'Заказ выполнен')], default='new', max_length=100, verbose_name='Статус заказа')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Коментарий к заказу')),
                ('created_at', models.DateTimeField(auto_now=True, verbose_name='Дата создания заказа')),
                ('order_date', models.DateField(default=django.utils.timezone.now, verbose_name='Дата получения заказа')),
                ('cart', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='shopserver.cart', verbose_name='Корзина')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_orders', to='shopserver.customer', verbose_name='Покупатель')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.AddField(
            model_name='customer',
            name='orders',
            field=models.ManyToManyField(blank=True, related_name='related_customer', to='shopserver.Order', verbose_name='Заказы покупателя'),
        ),
        migrations.AddField(
            model_name='customer',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Новая коллекция', max_length=150, verbose_name='Название коллекции')),
                ('status', models.CharField(default='new collection', max_length=150, verbose_name='Название коллекции')),
                ('image', models.ImageField(blank=True, upload_to='photos/%Y/%m/%d', verbose_name='изображение коллекции')),
                ('is_published', models.BooleanField(default=True, verbose_name='Публикация')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('products', models.ManyToManyField(blank=True, related_name='related_product', to='shopserver.Product')),
            ],
            options={
                'verbose_name': 'Коллекция',
                'verbose_name_plural': 'Коллекции',
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='CartProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.PositiveIntegerField(default=1)),
                ('final_price', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='Общая цена')),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_products', to='shopserver.cart', verbose_name='Корзина')),
                ('content_object', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopserver.product')),
                ('size', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shopserver.sizeproduct', verbose_name='Размер')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopserver.customer', verbose_name='Покупатель')),
            ],
            options={
                'verbose_name': 'Товар(в корзине)',
                'verbose_name_plural': 'Товары(в корзине)',
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='cart',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shopserver.customer', verbose_name='Владелец'),
        ),
        migrations.AddField(
            model_name='cart',
            name='product',
            field=models.ManyToManyField(blank=True, related_name='related_cart', to='shopserver.CartProduct'),
        ),
    ]