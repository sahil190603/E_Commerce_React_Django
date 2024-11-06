from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authapp.urls')),
    path('api/', include('E_commerce.urls')),
    path('api/', include('Cart.urls')),
    path('api/',include('Purchasehistory.urls')),
    path('api/',include('Rating.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

