from django import forms
from django.template.defaultfilters import mark_safe
import datetime


class FormaAMI(forms.Form): 
    dp = forms.CharField(help_text=u"Meteo podaci", label=mark_safe('<strong>Grad</strong>'),
                         widget=forms.Textarea(attrs={"rows":1, "cols":1,'placeholder': 'Odaberi meteorološku postaju'}))

   

    raspon_od = forms.DateField(widget=forms.widgets.DateInput(attrs={'type': 'date'}),
                                label=mark_safe('<strong>Odaberi datum</strong>'),
                                help_text="Unesite datum za tražene meteo podataka.")
        
    
  


