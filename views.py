
from rest_framework.response import Response
from .models import Services ,JobOffer,absence,Condidate,CustomUs,ContratHistory,Application,Interview,Evaluation,Employeur ,Conges_type,BalanceConge, Conges , Contrats , Salarys ,Recruitment
from .serializers import ServiceSerializer,UserProfileSerializer,absenceSerialzier,ContratHistorySerialzer,JobOfferSerializer,CondidateSerializer,ApplicationSerializer,InterviewSerializer ,EvaluationSerializer,CongeBalanceSerialzer, EmployeSerializer,CongeTypeSerializer,ContratSerializer,RegisterSerializer,LoginSerializer,CongeSerializer,RecrutementSerializer,SalaireSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from django.db.models import Count,Avg
from datetime import datetime
from rest_framework.views import APIView



class JobOfferApi(viewsets.ModelViewSet):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferSerializer
    
    
class CondidateApi(viewsets.ModelViewSet):
    queryset = Condidate.objects.all()
    serializer_class = CondidateSerializer
    
    
    
class ApplicationApi(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    
    
class InterviewApi(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer







# *******************************************************
# the register View
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)


# the login view
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        res = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(res, status=status.HTTP_200_OK)
    
    
    
def LogoutView(request):
    logout(request);
    return Response(status=status.HTTP_200_OK)
    

# *******************************************************

# *******************************************************
class EmployeViewApi(viewsets.ModelViewSet):
    queryset = Employeur.objects.all()
    serializer_class  = EmployeSerializer
    

class DelteEMployyeAPi(APIView):
    def delete(self,request,pk):
        try:
            emloye = Employeur.objects.get(pk=pk)
            emloye.delete()
            return Response(status=status.HTTP_200_OK)
        except Employeur.DoesNotExist:
            return Response({"employe doesnt exist "},status=status.HTTP_400_BAD_REQUEST)
        
        
class EvaluationApi(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class DeleteEvaluationAPI(APIView):
    def delete(self,request,pk):
        try:
            evals = Evaluation.objects.get(pk=pk)
            evals.delete()
            return Response(status=status.HTTP_200_OK)
        except Evaluation.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

 
 
class EmployeStats(APIView):
    def get(self, request):
         total_employees = Employeur.objects.count()
         
         diversite_sexe = Employeur.objects.values('sexe').annotate(count=Count('id'))
         
         # Top performeurs
         top_performeurs = Evaluation.objects.values('employee').annotate(moyenne_score=Avg('performance_score')).order_by('-moyenne_score')[:5]
         
         scores_sexe = Employeur.objects.values('sexe').annotate(avg_score=Avg('evaluation__performance_score'))
         
         score_performance = Evaluation.objects.values('employee').annotate(avg_score=Avg('performance_score'))
         
         iversite_anciennete = Employeur.objects.values('anciennite').annotate(count=Count('id'))

         return Response({
             'total_employees': total_employees,
             'diversite_sexe': diversite_sexe,
             'top_performeurs': top_performeurs,
             'scores_sexe': scores_sexe,
             'score_performance':score_performance,
             'iversite_anciennete' :iversite_anciennete,
         })
      
        
        
class absneceViewSets(viewsets.ModelViewSet):
    queryset = absence.objects.all()
    serializer_class = absenceSerialzier
    
class absencestats(APIView):
    def get(self, request):
        # Corriger la date et l'agrégation des absences
        absences = absence.objects.filter(Date_debut__gte='2024-01-01').values('date_debut').annotate(total_absences=Count('id')).order_by('-total_absences')
        return Response({'absences': absences})

# *******************************************************



class UserProfileView(viewsets.ModelViewSet):
    queryset = CustomUs.objects.all()
    serializer_class = UserProfileSerializer
    parser_classes = (MultiPartParser,FormParser)
    
    


    
        
    
    
    
    
    
    
# *******************************************************
#the services api
class ServiceAPI(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer     
    
class DeleteServiceApi(APIView):
    def delete(self,request,pk):
        try:
            service = Services.objects.get(pk=pk)
            service.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
# *******************************************************
    
    
    
    
    
    
    
# *******************************************************
#the contrat api
class ContractViewSet(viewsets.ModelViewSet):
    def perform_destroy(self, instance):
        is_archived = True
        instance.save()
    
    
    queryset = Contrats.objects.all()
    serializer_class = ContratSerializer
    
    
    
    
class ContratApiDelete(APIView):
    def delete(self,request,pk):
        try:
            contart = Contrats.objects.get(pk=pk)
            contart.delete()
            return Response(status=status.HTTP_200_OK)
        except Contrats.DoesNotExist:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        
        
        
class ContratHistoryViewSet(viewsets.ModelViewSet):
    queryset = ContratHistory.objects.all()
    serializer_class = ContratHistorySerialzer
    
# *******************************************************




# *******************************************************
#the conge api


class CongeApi(viewsets.ModelViewSet):
    queryset = Conges.objects.all()
    serializer_class = CongeSerializer

    def perform_create(self, serializer):
        conge = serializer.save()

        try:
            conge_balance = BalanceConge.objects.get(Employe=conge.Employe)
            conge_balance.updateBalance(conge)
        except BalanceConge.DoesNotExist:
            print(f"No balance found for {conge.Employe.nom_employe}")
            BalanceConge.objects.create(Employe=conge.Employe, type_conge=conge.type_conge, balance=0)
        

class CongesTypeList(viewsets.ModelViewSet):
    queryset = Conges_type.objects.all()
    serializer_class = CongeTypeSerializer


class BalanceCongeApi(viewsets.ModelViewSet):
    queryset = BalanceConge.objects.all()
    serializer_class = CongeBalanceSerialzer
    

class CongeApiDelete(APIView):
    def delete(self,request,pk):
        try:
            conge = Conges.objects.get(pk=pk)
            conge.delete()
            return Response({"conge deleting with success"},status=status.HTTP_200_OK)
        except Conges.DoesNotExist:
            return Response({"conges does not exist"},status=status.HTTP_400_BAD_REQUEST)
       
       
        
    
# *******************************************************
  
  
  
  
  
  
  
# *******************************************************
#the salaire api
class SalaireApi(viewsets.ModelViewSet):
    queryset = Salarys.objects.all()
    serializer_class = SalaireSerializer
    
class SalaireDeleteAPi(APIView):
    def delete(self,request,pk):
        try:
            salaire = Salarys.objects.get(pk=pk)
            salaire.delete()
            return Response({"salare has been delete  with success"},status=status.HTTP_200_OK)
        except Salarys.DoesNotExist:
            return Response({"salarire don't find"},status=status.HTTP_400_BAD_REQUEST)
        
    
# *******************************************************  
    
    
    
    
    
    
    
# *******************************************************   
#the recrutement api
class RecrutementApi(viewsets.ModelViewSet):
    queryset = Recruitment.objects.all()
    serializer_class = RecrutementSerializer

class DeleteRecruitmentApi(APIView):
    def delete(self,request,pk):
        try:
            recs = Recruitment.objects.get(pk=pk)
            recs.delete()
            return Response({"RECRUITEMENT HAS BEEN DELETING WITH SUCCESS"},status=status.HTTP_200_OK)    
        except Recruitment.DoesNotExist:
            return Response({"Recruitement does not exist"},status=status.HTTP_400_BAD_REQUEST)   
        
        
class RecrutementStats(APIView):
    def get(self,request):
        
        now = datetime.now()
        date_debut = now.replace(year=now.year - 1)
        
        new_recrutes = Employeur.objects.filter(date_recrutement__gte=date_debut).count()
        
        return Response({'new_recrutes':new_recrutes}) 
# *******************************************************


