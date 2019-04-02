from rest_framework import viewsets
from accounts.models import User
from ..serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = ()
    permission_classes = ()

    def get_queryset(self):
        return User.objects.filter(
            is_superuser=False, is_staff=False)
