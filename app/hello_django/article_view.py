from django.http import HttpResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from .models import Article


@csrf_exempt
def article(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        return HttpResponse('\n'.join(map(str, articles)))
    elif request.method == 'POST':
        a = Article(title=request.POST.get('title'),
                    text=request.POST.get('text'),
                    isFeatured=request.POST.get('isFeatured'))
        a.save()
        return HttpResponse(a)
    elif request.method == 'PATCH':
        a = Article.objects.filter(id=request.POST.get('id'))
        a.update(
            title=request.POST.get('title'),
            text=request.POST.get('text'),
            isFeatured=request.POST.get('isFeatured')
        )
        return HttpResponse(a.first())
    elif request.method == 'DELETE':
        Article.objects.filter(id=request.POST.get('id')).delete()
        return HttpResponse(request.GET.get('id'))
    else:
        raise Http404("Unsupported method")
