from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=2500)
    isFeatured = models.BooleanField(default=False)
