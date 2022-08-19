from django.views.decorators.csrf import csrf_exempt
from urllib import response
from django.shortcuts import render
from django.views.generic import View

import json
from django.http import HttpResponseBadRequest, JsonResponse
# Create your views here.

@csrf_exempt
def IDEmain(request):
    if request.method == 'GET':
        # print(request.GET)
        return render(request, 'index.html')
    elif request.method == 'POST':
        # code = request.POST.get('code')
        # lang = request.POST.get('lang')
        print(request.POST)
        # print(lang)
        return JsonResponse({'status': 'ok'})
    else:
        return HttpResponseBadRequest()

        