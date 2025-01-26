from rest_framework import serializers
from .models import Services,absence,JobOffer,ContratHistory,Condidate,Application,Interview,Employeur,Evaluation,Recruitment,Contrats,Conges,Salarys,Conges_type,BalanceConge
from .models import CustomUs

class JobOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model  = JobOffer
        fields = '__all__'
        
class CondidateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Condidate
        fields = '__all__'



class ApplicationSerializer(serializers.ModelSerializer):
    condidate = CondidateSerializer()
    job_offer = JobOfferSerializer()
    class Meta:
        model  = Application
        fields = '__all__'


class InterviewSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()
    class Meta:
        model  = Interview
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUs
        fields= ['username','email','profile_image']


# the register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUs
        fields = ('email', 'username', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords must match'})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')
        user = CustomUs.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    

# the login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        user = CustomUs.objects.filter(email=email).first()

        if user is None:
            raise serializers.ValidationError("User with this email does not exist.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        return {'user': user}



class absenceSerialzier(serializers.ModelSerializer):
    class Meta:
        model = absence
        fields = '__all__'


# the employe serializer
class EmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Employeur
        fields = '__all__'

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'
    
 
 


  
  
    
# the services serializer
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Services
        fields ='__all__'




class CongeTypeSerializer(serializers.ModelSerializer):
    class Meta :
        model   = Conges_type
        fiedlds = '_all__'
        
        
# the conge serializer
class CongeSerializer(serializers.ModelSerializer):
    type_conge = serializers.PrimaryKeyRelatedField(queryset=Conges_type.objects.all())
    Employe    = serializers.PrimaryKeyRelatedField(queryset=Employeur.objects.all())
    class Meta:
        model  = Conges
        fields = '__all__'
      
      
class CongeBalanceSerialzer(serializers.ModelSerializer):
    class Meta :
        model  = BalanceConge 
        fields =  '_all__'
    
    
# the contrat serializer    
class ContratSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Contrats
        fields = '__all__'


class ContratHistorySerialzer(serializers.ModelSerializer):
    class Meta:
        model  =ContratHistory
        fields ='__all__'
      
      
# the salaire serializer  
class SalaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salarys
        fields = '__all__'
        
        
        
class RecrutementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Recruitment
        fields = '__all__'
        