from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    inn = models.CharField(
        max_length=32, verbose_name='ИНН',
        validators=[validators.RegexValidator('^([0-9]{10}|[0-9]{12})$')],
        help_text='10 или 12 цифр', unique=True,)
    account = models.DecimalField(
        verbose_name='Счет', max_digits=7,
        decimal_places=2, null=True)
