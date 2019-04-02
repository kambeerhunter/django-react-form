from rest_framework import serializers
from accounts.models import User


class TransferSerializer(serializers.Serializer):
    source = serializers.IntegerField(max_value=None, min_value=0)
    inn_list = serializers.CharField(max_length=1024)
    value = serializers.DecimalField(max_digits=7, decimal_places=2)

    def validate(self, data):
        user_pk = data['source']
        value = data['value']
        inn_list = data['inn_list'].replace(' ', '').split(',')
        try:
            user = User.objects.get(pk=user_pk)
        except:
            raise serializers.ValidateError(
                'Не существует такого пользователя')
        if value and value > user.account:
            raise serializers.ValidationError(
                'Превышена максимальная сумма платежа')
        if value and value < 0:
            raise serializers.ValidationError(
                'Сумма перевода должна быть больше 0')
        if user and user.inn in inn_list:
            raise serializers.ValidationError(
                'Пользователь не может переводить средства самому себе')
        for inn in inn_list:
            if not User.objects.filter(inn=inn).exists():
                raise serializers.ValidationError(
                    f'Не существует пользователя с ИНН {inn}')
        return data
