import random
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from pprint import pprint
from .models import BasicUser
from Core.serializers import BasicUserSerializer
from rest_framework import viewsets
import requests
import json
from django.http import HttpResponse


# Create your views here.

def homepage(request):
    context = {}
    return render(request, "index.html", context)


class BasicUserViewSet(viewsets.ModelViewSet):
    queryset = BasicUser.objects.all()
    serializer_class = BasicUserSerializer


@csrf_exempt
def getOI(request, expiry, scrip):
    # url = "https://ewmw.edelweiss.in/api/Market/optionchainguest"
    url = "https://ewmw.edelweiss.in/api/Market/optionchaindetails"
    payload = {"exp": str(expiry), "aTyp": "OPTIDX", "uSym": scrip}
    response = requests.post(url, payload)

    jsoned_response = response.json()
    data_length = len(jsoned_response['opChn'])

    url = "https://api.niftytrader.in/webapi/Index/indexStocksData"
    atmresponse = requests.get(url)
    jsoned_atmresponse = atmresponse.json()
    if scrip == "NIFTY":
        atm = jsoned_atmresponse['resultData']['nifty50']['last_trade_price']
        atm = round(atm / 50) * 50
    if scrip == "BANKNIFTY":
        atm = jsoned_atmresponse['resultData']['niftybank']['last_trade_price']
        atm = round(atm / 100) * 100

    # print("ATM: ", atm)

    oiData = []
    atm_premium = 0

    for i in range(data_length):
        strike = jsoned_response['opChn'][i]['stkPrc']
        strike = int(float(strike))

        if scrip == "NIFTY":
            if not(atm - 500 < strike < atm + 500):
                continue
        if scrip == "BANKNIFTY":
            if not(atm - 1000 < strike < atm + 1000):
                continue

        ce_premium = jsoned_response['opChn'][i]['ceQt']['ltp']
        pe_premium = jsoned_response['opChn'][i]['peQt']['ltp']
        ce_oi = jsoned_response['opChn'][i]['ceQt']['opInt']
        pe_oi = jsoned_response['opChn'][i]['peQt']['opInt']
        ce_oichg = jsoned_response['opChn'][i]['ceQt']['opIntChg']
        pe_oichg = jsoned_response['opChn'][i]['peQt']['opIntChg']



        temp_dict = {}

        temp_dict['strike'] = strike
        if strike == atm:
            atm_premium = float(ce_premium) + float(pe_premium)

        temp_dict['ceOI'] = ce_oi
        temp_dict['peOI'] = pe_oi
        temp_dict['ceOIchg'] = ce_oichg
        temp_dict['peOIchg'] = pe_oichg
        # print(temp_dict)
        # print("\n")
        oiData.append(temp_dict)
    print(atm_premium)
    data = {"OI": oiData, "ATM": atm, "ATMPremium": atm_premium}
    # data['OI'] = oiData
    # data["ATM"] = atm_premium
    return HttpResponse(json.dumps(data))
