"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from myapp.views import RegisterView,UserProfileView,RecrutementStats, EmployeStats,absencestats,LoginView ,ContratHistoryViewSet,JobOfferApi,CondidateApi,DeleteEvaluationAPI,ApplicationApi,InterviewApi,EvaluationApi,BalanceCongeApi,ServiceAPI,CongesTypeList,CongeApiDelete, EmployeViewApi,ContractViewSet,DeleteRecruitmentApi,CongeApi,SalaireApi,SalaireDeleteAPi,RecrutementApi,DelteEMployyeAPi,LogoutView,DeleteServiceApi,ContratApiDelete
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (TokenRefreshView)
from rest_framework.routers import DefaultRouter

routerUser = DefaultRouter()
routerUser.register(r'users',UserProfileView)

routerCon = DefaultRouter()
routerCon.register(r'job-offers',JobOfferApi)
routerCon.register(r'condidate',CondidateApi)
routerCon.register(r'application',ApplicationApi)
routerCon.register(r'interviews',InterviewApi)




routerEmploye = DefaultRouter()
routerEmploye.register(r'employees',EmployeViewApi)


routerEvaluation = DefaultRouter()
routerEvaluation.register(r'evaluations',EvaluationApi)




routerServices = DefaultRouter()
routerServices.register(r'services',ServiceAPI)


routerContrat = DefaultRouter()
routerContrat.register(r'contrats',ContractViewSet)

routerContratsHistory = DefaultRouter()
routerContratsHistory.register(r'contratHistory',ContratHistoryViewSet)



routerConges = DefaultRouter()
routerConges.register(r'conges',CongeApi)

routerConges.register(r'TypesConges',CongesTypeList)

routerConges.register(r'BalanceConges',BalanceCongeApi)

routerSalaire = DefaultRouter()
routerSalaire.register(r'salaire',SalaireApi)

routerRecs = DefaultRouter()
routerRecs.register(r'recs',RecrutementApi)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    
    path('api/',include(routerCon.urls)), 
    # the authentification
    path('api/register/',RegisterView.as_view(),name='register'),
    path('api/login/',LoginView.as_view(),name='login'),
    path('api/logout/',LogoutView,name='logout'),
    
    
    
    path('api/',include(routerUser.urls)), 
    
    
    
    
    # all about the employees
    path('api/',include(routerEmploye.urls)),
    path('api/employees/<int:pk>/delete/',DelteEMployyeAPi.as_view(),name='DeleteEmploye'),
    
    
    path('api/',include(routerEvaluation.urls)),
    path('api/evaluations/<int:pk>/delete/',DeleteEvaluationAPI.as_view(),name='deleteEvaluation'),
    
    
     # all about Services
    path('api/',include(routerServices.urls)),
    path('api/services/<int:pk>/delete/',DeleteServiceApi.as_view(),name='DeleteServices'),
    
    
    
    # all about contrats
    path('api/',include(routerContrat.urls)),
    path('api/contrats/<int:pk>/delete/',ContratApiDelete.as_view(),name="deleteContarts"),
    path('api/',include(routerContratsHistory.urls)),
    
     # all about conge
    path('api/',include(routerConges.urls)),
    path('api/conges/<int:pk>/delete/',CongeApiDelete.as_view(),name='congesDelete'),
    
    
     # all about salaire
    path('api/',include(routerSalaire.urls)),
    path('api/salaire/<int:pk>/delete',SalaireDeleteAPi.as_view(),name="deleteSalaire"),
    
    
     # all about recrutements
    path('api/',include(routerRecs.urls)),
    path('api/recs/<int:pk>/delete/',DeleteRecruitmentApi.as_view(),name="DeleteRecruitment"),

    
    path('api/statistiques/employe/',EmployeStats.as_view(),name="EmployeStats"),
    path('api/statistiques/absences/',absencestats.as_view(),name="absencestats"),
    path('api/statistiques/recrutement/',RecrutementStats.as_view(),name="RecrutementStats"),
    
    path('', TemplateView.as_view(template_name='index.html')),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)