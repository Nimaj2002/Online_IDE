from os import remove
import time
from django.views.decorators.csrf import csrf_exempt
from urllib import response
from django.shortcuts import render
from django.views.generic import View
import subprocess

from django.http import HttpResponseBadRequest, JsonResponse
# Create your views here.

@csrf_exempt
def IDEmain(request):
    if request.method == 'GET':
        # print(request.GET)
        return render(request, 'index.html')
    elif request.method == 'POST':
        code = request.POST.get('code')
        inp = request.POST.get('input')
        lang = request.POST.get('language')

        if lang == 'python':
            with open("IDE/codes/pycode.py", "w") as f:
                f.write(code)

            py_result = subprocess.run(["python", "IDE/codes/pycode.py"], shell=True, capture_output=True, text=True, input=inp)
            remove("IDE/codes/pycode.py")
            return JsonResponse({'result': py_result.stdout}, status=200)

        elif lang == 'cpp':
            with open("IDE/codes/cppcode.cpp", "w") as f:
                f.write(code)
            
            subprocess.call(['g++', 'IDE/codes/cppcode.cpp', '-o', 'IDE/codes/cppcode.exe'])
            cpp_result = subprocess.check_output(["IDE/codes/cppcode.exe"], universal_newlines=True)
            remove("IDE/codes/cppcode.cpp")
            remove("IDE/codes/cppcode.exe")
            return JsonResponse({'result': cpp_result}, status=200)

    else:
        return HttpResponseBadRequest()

        