import factory
from uuid import uuid4
from factory.django import DjangoModelFactory
from accounts.models import User


def get_inn():
    inn = str(uuid4()).replace('-', '')
    return inn


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence('User #{}'.format)
    inn = factory.Sequence(lambda n: '123456789{0}'.format(n))
    account = 500
