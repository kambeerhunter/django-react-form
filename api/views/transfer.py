import math
import json
from decimal import Decimal
from django.db.models import F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from ..serializers import TransferSerializer


def jsonDecimal(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    return str(obj)


class TransferView(APIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = User.objects.filter(
        is_superuser=False, is_staff=False)

    def post(self, request, format=None, *args, **kwargs):
        serializer = TransferSerializer(data=request.data)
        if serializer.is_valid():
            inn_list = serializer.data['inn_list'].replace(' ', '').split(',')
            source = serializer.data['source']
            user = User.objects.get(pk=source)
            recipient_list = User.objects.filter(inn__in=inn_list)
            value = serializer.data['value']
            single_value = math.floor(float(value) / recipient_list.count())
            user.account = F('account') - value
            user.save()
            for recipient in recipient_list:
                recipient.account = F('account') + single_value
                recipient.save()
            response_data = json.dumps(list(self.queryset.values(
                'pk', 'inn', 'account', 'username')), default=jsonDecimal)
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
