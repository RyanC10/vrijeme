
# Create your views here.

from . import views
from django.urls import include, path
from APLIKACIJA.views import izlaz



urlpatterns= [
       path(r'', views.pocetna, name='pocetna'),
       path(r'ami', izlaz.as_view()),
      
   
    ]

