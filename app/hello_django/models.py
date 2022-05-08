from django.db import models


class Article(models.Model):
    title = models.CharField(100)
    text = models.CharField(2500)
    isFeatured = models.BooleanField(default=False)
