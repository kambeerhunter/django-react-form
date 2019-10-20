#!/bin/sh

# create test users
CREATE_USERS="
from django.contrib.auth import get_user_model
User = get_user_model()

if not User.objects.all().exists():
    u = User.objects.create(username='admin', is_staff=True, is_superuser=True)
    u.set_password('12345')
    u.save()

    test_accounts = {
        '123456789000': 1000,
        '123456789001': 1000,
        '123456789002': 1000
    }

    for index, key in enumerate(test_accounts):
        User.objects.create(
          username=f'user_{index}',
          inn=key,
          account=test_accounts[key],
        )
"

cd /app/src/

sleep 5

python manage.py migrate
python manage.py shell -c "${CREATE_USERS}"
