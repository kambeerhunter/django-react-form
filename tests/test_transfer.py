import pytest
import requests
from tests.factories import UserFactory
from accounts.models import User
from money_transfer.forms import MoneyTransferForm


@pytest.mark.django_db
def test_validate_transfer_form():
    user_0 = User.objects.all()[0]
    user_1 = User.objects.all()[1]
    user_2 = User.objects.all()[2]

    payload = {
        'source': user_0.pk,
        'inn_list': f'{user_1.inn}, {user_2.inn}',
        'value': 3,
    }

    form = MoneyTransferForm(data=payload)
    assert form.is_valid() is True
