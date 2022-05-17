from django.http import HttpResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from .models import Article
from rest_framework.decorators import api_view


@csrf_exempt
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def article(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        return HttpResponse('\n'.join(map(str, articles)))
    elif request.method == 'POST':
        a = Article(title=request.data['title'],
                    text=request.data['text'],
                    isFeatured=request.data['isFeatured'])
        a.save()
        return HttpResponse(a)
    elif request.method == 'PATCH':
        a = Article.objects.filter(id=request.data['id'])
        a.update(
            title=request.data['title'],
            text=request.data['text'],
            isFeatured=request.data['isFeatured']
        )
        return HttpResponse(a.first())
    elif request.method == 'DELETE':
        Article.objects.filter(id=request.data['id']).delete()
        return HttpResponse(request.data['id'])
    else:
        raise Http404("Unsupported method")
