from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .service import ProductFilter
from rest_framework_simplejwt.tokens import RefreshToken


# class Logout(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def post(self, request):
#
#         try:
#             print(request.data["ref_token"])
#             print(request.user.JTI)
#             ref_token = request.data["ref_token"]
#             token = RefreshToken(ref_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

class CollectionSet(viewsets.ModelViewSet):

    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class SizeProductSet(viewsets.ModelViewSet):

    queryset = SizeProduct.objects.all()
    serializer_class = SizeProductSerializer


class CategorySet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductRetrieveSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, )
    ordering_fields = ('price', 'final_price', 'created_at')
    filterset_class = ProductFilter


class CartProductSet(viewsets.ModelViewSet):

    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer


class OrderSet(viewsets.ModelViewSet):
    serializer_class = OrderCustomerSerializer
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get_order(user, cart, customer):
        order, created = Order.objects.get_or_create(
            customer=customer,
            cart = cart,
            first_name = user.first_name,
            last_name = user.last_name,
            phone = customer.phone,
            address = customer.address,
        )
        return order

    @staticmethod
    def get_cart(user):
        if user.is_authenticated:
            cart, created = Cart.objects.get_or_create(
                owner=user.customer,
                for_anonymous_user=False
            )
            return cart
        return Cart.objects.filter(for_anonymous_user=True).first()

    @action(methods=["get"], detail=False)
    def current_customer_order(self, request, *args, **kwargs):
        customer, created = Customer.objects.get_or_create(
            user = request.user,
        )
        cart = self.get_cart(self.request.user)
        order = self.get_order(self.request.user, cart, customer)
        cart_serializer = CartSerializer(cart)
        order_serializer = OrderCustomerSerializer(order)
        return Response( {"order":order_serializer.data,
                          "cart":cart_serializer.data
                          })

    @action(methods=["get"], detail=False)
    def customer_orders(self, request, *args, **kwargs):
        customer, created = Customer.objects.get_or_create(
            user=request.user,
        )
        print(customer)
        print(Order.objects.filter(customer=customer))

        order = Order.objects.filter(customer=customer)
        print(order)
        order_serializer = OrderCustomerSerializer(order)
        print(order_serializer)
        return Response(order_serializer.data)


class CartViewSet(viewsets.ModelViewSet):

    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get_cart(user):
        if user.is_authenticated:
            cart, created = Cart.objects.get_or_create(
                owner = user.customer,
                for_anonymous_user = False
            )
            return cart
        return Cart.objects.filter(for_anonymous_user=True).first()

    @staticmethod
    def _get_or_create_cart_product(customer: Customer, cart: Cart, product: Product, size):
        if not size:
            size = product.size.first()
        cart_product, created = CartProduct.objects.get_or_create(
            user=customer,
            content_object=product,
            cart=cart,
            size=size,
        )
        # print(cart_product)
        return cart_product, created

    @action(methods=["get"], detail=False)
    def current_customer_cart(self, request, *args, **kwargs):
        customer, created = Customer.objects.get_or_create(
            user = request.user,
        )
        cart = self.get_cart(self.request.user)
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)

    @action(methods=["post"], detail=False)
    def product_add_to_cart(self, *args, **kwargs):
        cart = self.get_cart(self.request.user)
        try:
            size = SizeProduct.objects.get(id=self.request.data['sizeProduct'])
        except:
            print('Error size')
            size = 0
        finally:
            product = get_object_or_404(Product, id=self.request.data['product_id'])
            cart_product, created = self._get_or_create_cart_product(self.request.user.customer, cart, product, size)
            if created:
                cart.product.add(cart_product)
                cart.save()
                return Response({"detail": "Товар добавлен в корзину", "added": True})
            return Response({"detail": "Товар уже в корзине", "added": False})

    @action(methods=["patch"], detail=False)
    def product_change_qty(self, *args, **kwargs):
        print(self.request.data)
        cart_product = get_object_or_404(CartProduct.objects.filter(id=self.request.data['product_id'], size=self.request.data['sizeProduct']))
        print(cart_product.qty)
        cart_product.qty = int(self.request.data['qty'])
        cart_product.save()
        cart_product.cart.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=["patch"], detail=False)
    def product_change_size(self, *args, **kwargs):
        print(self.request.data)
        cart_product = get_object_or_404(
            CartProduct.objects.filter(id=self.request.data['product_id'], size=self.request.data['sizeProduct']))
        print(cart_product.size)
        newSize = get_object_or_404(SizeProduct.objects.filter(id=self.request.data['new_size']))
        cart_product.size = newSize
        cart_product.save()
        cart_product.cart.save()
        return Response(status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def product_remove_from_cart(self, request, *args, **kwargs):
        cart = self.get_cart(self.request.user)
        print(CartProduct.objects.filter(id=self.request.data['product_id'], size=self.request.data['sizeProduct']))
        cart_product = get_object_or_404(CartProduct.objects.filter(id=self.request.data['product_id'], size=self.request.data['sizeProduct']))
        print(cart_product)
        cart.product.remove(cart_product)
        cart_product.delete()
        cart.save()
        return Response(status=status.HTTP_204_NO_CONTENT)



