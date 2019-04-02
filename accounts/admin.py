from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ('id', 'username', )


admin.site.register(User, UserAdmin)
