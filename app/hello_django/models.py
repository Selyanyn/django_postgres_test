from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=2500)
    isFeatured = models.BooleanField(default=False)
    
    def __str__(self):
        return '{}: {}! {}. featured: {}'.format(self.id, self.title, self.text, self.isFeatured)
