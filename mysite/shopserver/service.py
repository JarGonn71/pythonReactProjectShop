from django_filters import rest_framework as filters
from .models import Product
from rest_framework_simplejwt.serializers import TokenRefreshSlidingSerializer
from rest_framework_simplejwt.views import TokenViewBase


# class MyTokenObtainPairView(TokenViewBase):
#     serializer_class = TokenRefreshSlidingSerializer
#

class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class ProductFilter(filters.FilterSet):
    category = CharFilterInFilter(field_name='category__slug', lookup_expr='in')
    floor = CharFilterInFilter(field_name='floor__slug', lookup_expr='in')

    class Meta:
        model = Product
        fields = ['category', 'floor']