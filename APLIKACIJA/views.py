from django.shortcuts import render, HttpResponse,redirect
from django.http import HttpResponse
from django.views.generic import TemplateView
from APLIKACIJA.forms import FormaAMI
import urllib.parse
import requests
import json
import pandas as pd
from datetime import *
import csv
import re
import numpy as np
noProxy = {"http":None,"https":None,"ftp":None}

def rfc3339_u_lokalno(ulazRFC):
    vrijeme1 = datetime.strptime(ulazRFC, "%m-%d-%Y")
    vrijemeUTC = vrijeme1.replace(tzinfo=timezone.utc) #pridijeli vremenu utc oznaku
    vrijemeLokalno = vrijemeUTC.astimezone(tz=None)
    return vrijemeLokalno

def doznaj_sat(ulaz):
    return str(ulaz.strftime("%H.%M"))
def doznaj_datum(ulaz):
    return str(ulaz.strftime("%Y-%m-%d"))


def pocetna(request):
      return render(request, 'accounts/AMI.html')



class izlaz(TemplateView):
    
    template_name='accounts/meteo.html'

    def get(self,request):
        form = FormaAMI()
        return render(request, self.template_name, {'form':form, 'text':'prvo ucitavanje'})

    def post(self,request):   
        form = FormaAMI(request.POST)
        dp = request.POST.get('dp')
        print(dp)
        vrijeme =  request.POST.get('raspon_od')
        print(vrijeme) 
        
        #datum=vrijeme[:4]+"-"+vrijeme[0:1]+"-"+vrijeme[3:4]
        #print(datum)
        #print(dp)
        
         

        from pymongo import MongoClient
        client = MongoClient("mongodb://localhost:27017/") 
        db = client.Vrijeme
        collection = db.gradovi
        ulaz_mongo=pd.DataFrame()
        for item in collection.find({"Datum":str(vrijeme)}):
            ulaz_mongo = ulaz_mongo.append(item, ignore_index=True)

        ulaz_mongo = ulaz_mongo.drop(['_id'], axis=1)
  

        print(ulaz_mongo.head())


        ulaz_mongo =ulaz_mongo[ulaz_mongo['nazivGrad'].str.contains(dp) ]

        
        print(ulaz_mongo.head())
        maksimum=ulaz_mongo.max().reset_index()
        print(maksimum)
        maksimum=maksimum.tail(9)
        maksimum=maksimum.values

        ulaz_mongo=ulaz_mongo.values
        args ={'form':form,'ulaz_mongo':ulaz_mongo,'maksimum':maksimum}
    
        
        return render(request, self.template_name, args)  


