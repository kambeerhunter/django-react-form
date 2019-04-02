import pytest
from accounts.models import User


@pytest.mark.django_db
def test_get_user_list(client):
    response = client.get('/api/users/')
    assert response.status_code == 200
    assert len(response.json()) == User.objects.all().count()


@pytest.mark.django_db
def test_money_transfer(client):
    data = {
        'source': User.objects.all()[0].pk,
        'inn_list':
            f'{User.objects.all()[1].inn}, {User.objects.all()[2].inn}',
        'value': 500,
    }
    response = client.post('/api/transfer/', data)
    assert response.status_code == 201
    assert User.objects.all()[0].account == 0
    assert User.objects.all()[1].account == 750
    assert User.objects.all()[2].account == 750
