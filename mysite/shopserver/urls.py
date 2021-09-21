from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = routers.SimpleRouter()
router.register('category', CategorySet, basename='category')
router.register('size-product', SizeProductSet, basename='size-product')
router.register('product', ProductViewSet, basename='product')
router.register('cart', CartViewSet, basename='cart')
router.register('cart-product', CartProductSet, basename='cart-product')
router.register('order', OrderSet, basename='order')
router.register('collection', CollectionSet, basename='collection')
# router.register('customer', CustomerSet, basename='customer')


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls

