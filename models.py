from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
# Optional: If you want to extend the User model, use this:
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.utils import timezone



#class Service 
class Services(models.Model):
    nom_service   = models.CharField(max_length=50)
    description   = models.TextField()
        
def __str__(self):
    return self.nom_service




class CustomUs(AbstractUser):
    email      = models.EmailField(unique=True)
    
    profile_image = models.ImageField(upload_to='profile_images/',null=True,blank=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set', 
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set', 
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )







# class Employe 
class Employeur(models.Model):
    nom_employe       = models.CharField(max_length=50)
    prenom_employe    = models.CharField(max_length=50)
    date_naissance    = models.DateField()
    sexe              = models.CharField(max_length=10, choices=[('Homme', 'Homme'), ('Femme', 'Femme'), ('Autre', 'Autre')])
    email             = models.EmailField(max_length=254,unique=True)
    image_employee    = models.URLField(max_length=200, blank=True)
    adresse_employe   = models.CharField(max_length=40)
    date_embauche     = models.DateField()
    anciennite        = models.IntegerField()
    date_recrutement  = models.DateField()
    Service           = models.ForeignKey(Services,on_delete=models.CASCADE)
    training          = models.CharField(max_length=50)
    skills            = models.CharField(max_length=50)
    
def __str__ (self):
    return f"{self.nom_employe}{self.prenom_employe}"
    
# class absence
class absence(models.Model):
    employee = models.ForeignKey(Employeur, on_delete=models.CASCADE) 
    date_debut = models.DateTimeField()
    date_fin = models.DateTimeField()
    
    def __str__(self):
        return f"{self.employee}-{self.date_debut}-{self.date_fin}"
    
    
    
# class Evaluation
class Evaluation(models.Model):
    employee = models.ForeignKey(Employeur, on_delete=models.CASCADE)
    date_evaluation = models.DateField()
    performance_score = models.DecimalField(max_digits=5, decimal_places=2)
    comments = models.TextField()
    objectifs_archieved = models.TextField()
    strenghts = models.TextField()
    areas_for_improvement= models.TextField()
    
    def __str__(self):
        return f"Evaluation for {self.employee.nom_employe} on {self.date_evaluation}"
    










# class conge_type
class Conges_type(models.Model):
    type_conge       = models.CharField(max_length=50)
    description      = models.TextField()
    
    def __str__(self):
        return self.type_conge


# class Conge
class Conges(models.Model):
    Date_debut = models.DateField()
    Date_fin   = models.DateField()
    type_conge = models.ForeignKey(Conges_type,on_delete=models.SET_NULL,null=True,related_name='conges')
    Employe    = models.ForeignKey(Employeur,on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    status     = models.CharField(max_length=50 , choices=STATUS_CHOICES, default='Pending')
    
    def total_days(self):
        return (self.Date_fin - self.Date_debut).days + 1
        
        
    def __str__(self):
        return f"{self.Employe.nom_employe} {self.type_conge} leave from {self.Date_debut} to {self.Date_fin}"




# class balance Conge
class BalanceConge(models.Model):
    type_conge               = models.ForeignKey(Conges_type, on_delete=models.CASCADE)
    Employe                  = models.ForeignKey(Employeur, on_delete=models.CASCADE)
    balance                  = models.IntegerField()
    annuel_conge_balance     = models.IntegerField(default=0)
    malade_conge_balance     = models.IntegerField(default=0)
    materninty_conge_balance = models.IntegerField(default=0)
    
    def __str__(self):
        return f"conges balance pour {self.Employe.nom_employe}"
    
    def updateBalance(self, Conges):
        if Conges.type_conge.type_conge == 'Annuel':
            self.annuel_conge_balance -= Conges.total_days()
        elif Conges.type_conge.type_conge == 'Malade':
            self.malade_conge_balance -= Conges.total_days()
        elif Conges.type_conge.type_conge == 'Maternite':
            self.materninty_conge_balance -= Conges.total_days()
        self.save()












# class contrats
class Contrats(models.Model):
    CONTRATS_TYPES    = [
        ('CDI','Contrat a Duree Indeterminee'),
        ('CDD','Contrat a Duree Determinee'),
        ('STAGE','Stage'),
        ('SPECIFIC','Autre specifique'),
    ]
    type_contrat      = models.CharField(max_length=100,choices=CONTRATS_TYPES)
    date_debut        = models.DateField()
    date_fin          = models.DateField()
    salaire_mensuel   = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    salaire_quoridien = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    probation_period_end = models.DateField(null=True,blank=True)
    is_archived = models.BooleanField(default=False)
    Employe = models.ForeignKey(Employeur,on_delete=models.CASCADE)
    
    def is_probation_ended(self):
        return self.probation_period_end and self.probation_period_end < timezone.now().date()
        
        
    def is_contract_expired(self):
        return self.date_fin and self.date_fin < timezone.now().date()
    
    class Meta:
        ordering = ['date_debut']
    
    
    
    
    def __str__(self):
        return f" {self.type_contrat} Contract pour {self.Employe.nom_employe}"



# class Contrat History
class ContratHistory(models.Model):
    contrat  = models.ForeignKey(Contrats, on_delete=models.CASCADE,related_name='history')
    action   = models.CharField(max_length=50)
    tempsSt  = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.contrat}-{self.tempsSt}"
    
    














# class Salarys
class Salarys(models.Model):
    type_salaire    = models.CharField(max_length=50)
    monthely_salary = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    daily_salary    = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    salary_date     = models.DateField()
    Employe         = models.ForeignKey(Employeur,on_delete=models.CASCADE)
    
    def __str__(self):
        return f" salaire pour  {self.Employe.nom_employe} in the date  {self.salary_date}"



# class Recruitement
class Recruitment(models.Model):
    job_position = models.CharField(max_length=50)
    applicant_name =models.CharField(max_length=40)
    date_interview = models.DateField()
    status = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.applicant_name} pour {self.job_position}"
    
    
# class Job offer
class JobOffer(models.Model):
    title = models.CharField(max_length=50)
    description =  models.TextField()
    requirments = models.TextField()
    location = models.CharField(max_length=50)
    posted_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.title
    
    
class Condidate(models.Model):
    first_name  = models.CharField( max_length=50)
    last_name   = models.CharField( max_length=50)
    email       = models.EmailField( max_length=254)
    phone_number= models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.firstname}{self.last_name}"
    
class Application(models.Model):
    STAT_CHOICES =[
        ('RECEIVED','Recue'),
        ('IN_PROFRESS','En Cours'),
        ('REJECTED','Rejetee'),
        ('ACCEPTED','Accepte'),
    ]
    job_offer = models.ForeignKey(JobOffer,on_delete=models.CASCADE)
    condidate = models.ForeignKey(Condidate ,on_delete=models.CASCADE)
    submitted_at = models.DateTimeField()
    interview_location = models.CharField(max_length=40)
    notes = models.TextField()
    
    def __str__(self):
        return f"ENTR pour {self.condidate}-{self.job_offer.title}"
    
    
class Interview(models.Model):
    application =models.ForeignKey(Application, on_delete=models.CASCADE)
    interview_date = models.DateTimeField()
    location = models.CharField(max_length=50)
    notes = models.TextField()
    
    def __str__(self):
        return f"{self.application.condidate}-{self.interview_date}"
    
    
    
    