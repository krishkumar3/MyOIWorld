from django.db import models
from django.core.validators import MinLengthValidator


# Create your models here.


class BasicUser(models.Model):
    username = models.CharField(default="ABC123", max_length= 50)
    password = models.CharField(default="12345678", max_length=50, validators=[MinLengthValidator(8)])
    email = models.EmailField()
    phone = models.IntegerField()
    name = models.CharField(default="User", max_length= 50)
