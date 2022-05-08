from django.http import HttpResponse
from django.http import Http404
from .models import Article


def article(request):
    if request.method == 'GET':
        articles = Article.objects.get()
        return HttpResponse(articles)
    elif request.method == 'POST':
        a = Article(title=request.data['title'],
                    text=request.data['text'],
                    isFeatured=request.data['isFeatured'])
        a.save()
        return HttpResponse(a)
    elif request.method == 'EDIT':
        a = Article.objects.filter(id=request.data['id'])
        a.update(
            title=request.data['title'],
            text=request.data['text'],
            isFeatured=request.data['isFeatured']
        )
        return HttpResponse(a.first())
    elif request.method == 'DELETE':
        Article.objects.filter(id=request.data['id']).delete()
        return HttpResponse('OK')
    else:
        raise Http404("Unsupported method")
