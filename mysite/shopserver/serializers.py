from rest_framework import serializers
from .models import *


class SizeProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = SizeProduct
        fields = '__all__'


class MyFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyFloor
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductRetrieveSerializer(serializers.ModelSerializer):

    floor = MyFloorSerializer()
    size = SizeProductSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):

    content_object = ProductRetrieveSerializer()

    class Meta:
        model = CartProduct
        fields = ['id', 'content_object', 'qty', 'final_price', 'size']


class OrderCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model= Order
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = '__all__'

    @staticmethod
    def get_user(obj):
        if not (obj.user.first_name and obj.user.last_name):
            return obj.user.username
        return ' '.join([obj.user.first_name, obj.user.last_name])


class CartSerializer(serializers.ModelSerializer):

    product = CartProductSerializer(many=True)
    owner = CustomerSerializer()

    class Meta:
        model = Cart
        fields = '__all__'


