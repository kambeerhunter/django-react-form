import math
from django.views import generic
from django.urls import reverse
from django.db.models import F
from django.http import HttpResponseRedirect
from .forms import MoneyTransferForm
from accounts.models import User


class MainPageView(generic.TemplateView):
    template_name = 'index.html'


class DjangoFormView(generic.FormView):
    template_name = 'django-form.html'
    form_class = MoneyTransferForm

    def get_success_url(self):
        return reverse('django-form')

    def form_valid(self, form):
        inn_list = form.cleaned_data['inn_list']
        source = form.cleaned_data['source']
        recipient_list = User.objects.filter(inn__in=inn_list)
        value = form.cleaned_data['value']
        single_value = math.floor(value / recipient_list.count())
        source.account = F('account') - value
        recipient_list.update(account=F('account') + single_value)
        return HttpResponseRedirect(self.get_success_url())
