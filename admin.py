from django.contrib import admin 
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Services ,Employeur,absence, JobOffer,Condidate,Application,Interview,Recruitment,Evaluation,Salarys,Conges_type,BalanceConge,Contrats,Conges,CustomUs
admin.site.register(Services)
admin.site.register(Employeur)
admin.site.register(Conges)
admin.site.register(Contrats)
admin.site.register(Salarys)
admin.site.register(Recruitment)
admin.site.register(BalanceConge)
admin.site.register(Conges_type)
admin.site.register(Evaluation)
admin.site.register(JobOffer)
admin.site.register(Condidate)
admin.site.register(Application)
admin.site.register(Interview)
admin.site.register(absence)

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'username')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

admin.site.register(CustomUs, CustomUserAdmin)