from django import forms
from accounts.models import User


class MoneyTransferForm(forms.Form):
    source = forms.ModelChoiceField(
        queryset=User.objects.filter(is_staff=False, is_superuser=False),
        empty_label='Выберете источник перевода',
        label='Источник перевода'
    )
    inn_list = forms.CharField(
        max_length=1024,
        label='Список ИНН получателей',)
    value = forms.DecimalField(
        max_digits=7, decimal_places=2, label='Сумма перевода')

    def clean(self):
        cleaned_data = super().clean()
        user = cleaned_data.get('source')
        value = cleaned_data.get('value')
        inn_list = self.cleaned_data.get(
            'inn_list', '').replace(' ', '').split(',')
        if value and value > user.account:
            raise forms.ValidationError(
                'Превышена максимальная сумма платежа', code='invalid')
        if value and value < 0:
            raise forms.ValidationError(
                'Сумма перевода должна быть больше 0', code='invalid')
        if user and user.inn in inn_list:
            raise forms.ValidationError(
                'Пользователь не может переводить средства самому себе',
                code='invalid')
        for inn in inn_list:
            if not User.objects.filter(inn=inn).exists():
                raise forms.ValidationError(
                    f'Не существует пользователя с ИНН {inn}', code='invalid')
        return super().clean()
