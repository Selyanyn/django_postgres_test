from django.http import HttpResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from .models import Article
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

@csrf_exempt
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def article(request):
    if request.method == 'GET':
        articles = map(str, Article.objects.all())
        dict = {}
        for article in articles:
            elem = article.split()
            dict[elem[0]] = {'title': elem[1], 'text': elem[2], 'isFeatured': elem[3]}
        return HttpResponse(json.dumps(dict))
    elif request.method == 'POST':
        print('Запрос:', request)
        data = json.loads(request.body)
        a = Article(title=data['title'],
                    text=data['text'],
                    isFeatured=data['isFeatured'])
        a.save()
        return HttpResponse(a)
    elif request.method == 'PATCH':
        data = json.loads(request.body)
        a = Article.objects.filter(id=data['id'])
        a.update(
            title=data['title'],
            text=data['text'],
            isFeatured=data['isFeatured']
        )
        return HttpResponse(a.first())
    elif request.method == 'DELETE':
        data = json.loads(request.body)
        Article.objects.filter(id=data['id']).delete()
        return HttpResponse(data['id'])
    else:
        raise Http404("Unsupported method")
        
def mainPage(request):
    return render(request, 'main.html')
