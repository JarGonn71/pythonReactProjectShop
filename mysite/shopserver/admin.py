from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe


class ProductAdmin(admin.ModelAdmin):

    # inlines = [GalleryInline, ]
    list_display = ('id', 'get_photo', 'title', 'category', 'created_at', 'floor', 'price', 'final_price', 'quantity', 'is_published')
    list_display_links = ('id', 'title')
    list_editable = ('is_published', 'quantity',)
    list_filter = ('is_published', 'category', 'size', 'floor')

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50px">')

    get_photo.short_description = 'Превью'


class OrderAdmin(admin.ModelAdmin):

    list_display = ('id', 'status', 'customer')
    list_filter = ('status',)


class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published')
    list_editable = ('is_published',)


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    list_display_links = ('id', 'user')


admin.site.register(Category)
admin.site.register(SizeProduct)
admin.site.register(MyFloor)
admin.site.register(Product, ProductAdmin)
admin.site.register(CartProduct)
admin.site.register(Cart)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Collection, CollectionAdmin)