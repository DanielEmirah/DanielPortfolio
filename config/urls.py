from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
]

# Ajoute les URLs pour servir les fichiers médias en développement
# Ces URLs ne fonctionnent que si DEBUG=True (mode développement)
if settings.DEBUG:
    # Sert les fichiers médias uploadés (images, CV, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Sert les fichiers statiques (CSS, JS, images fixes)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)