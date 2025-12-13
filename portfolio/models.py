from django.db import models
from django.utils import timezone

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    description = models.CharField(max_length=300, verbose_name="Description courte")
    detailed_description = models.TextField(verbose_name="Description détaillée")
    image = models.ImageField(upload_to='projects/', verbose_name="Image du projet")
    technologies = models.CharField(max_length=300, verbose_name="Technologies")
    project_url = models.URLField(blank=True, null=True, verbose_name="Lien du projet")
    github_url = models.URLField(blank=True, null=True, verbose_name="Lien GitHub")
    created_date = models.DateTimeField(default=timezone.now, verbose_name="Date de création")
    is_featured = models.BooleanField(default=True, verbose_name="Projet mis en avant")
    
    class Meta:
        # Nom affiché dans l'admin Django
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        # Ordre d'affichage (du plus récent au plus ancien)
        ordering = ['-created_date']
    
    def __str__(self):
        return self.title


class Skill(models.Model):
    # Nom de la compétence (ex: Python, Django, React)
    name = models.CharField(max_length=100, verbose_name="Nom de la compétence")
    # Catégorie de la compétence (Frontend, Backend, etc.)
    category = models.CharField(max_length=100, verbose_name="Catégorie")
    # Niveau de maîtrise en pourcentage (0-100)
    level = models.IntegerField(default=50, verbose_name="Niveau (%)")
    # Icône ou classe CSS pour représenter la compétence (optionnel)
    icon = models.CharField(max_length=50, blank=True, null=True, verbose_name="Icône")
    
    class Meta:
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"
        # Ordre d'affichage par catégorie puis par nom
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category})"


class Contact(models.Model):
    # Nom de la personne qui contacte
    name = models.CharField(max_length=100, verbose_name="Nom")
    # Email de la personne
    email = models.EmailField(verbose_name="Email")
    # Sujet du message
    subject = models.CharField(max_length=200, verbose_name="Sujet")
    # Contenu du message
    message = models.TextField(verbose_name="Message")
    # Date d'envoi du message
    sent_date = models.DateTimeField(auto_now_add=True, verbose_name="Date d'envoi")
    # Indique si le message a été lu
    is_read = models.BooleanField(default=False, verbose_name="Lu")
    
    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        # Ordre d'affichage (du plus récent au plus ancien)
        ordering = ['-sent_date']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


# Modèle pour les informations personnelles du portfolio
class Profile(models.Model):
    # Nom complet
    full_name = models.CharField(max_length=100, verbose_name="Nom complet")
    # Titre professionnel (ex: Développeur Full Stack)
    title = models.CharField(max_length=200, verbose_name="Titre professionnel")
    # Biographie / À propos
    bio = models.TextField(verbose_name="Biographie")
    # Photo de profil
    profile_picture = models.ImageField(upload_to='profile/', verbose_name="Photo de profil")
    # Email professionnel
    email = models.EmailField(verbose_name="Email")
    # Numéro de téléphone (optionnel)
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Téléphone")
    # Liens vers les réseaux sociaux (optionnels)
    github_link = models.URLField(blank=True, null=True, verbose_name="Lien GitHub")
    linkedin_link = models.URLField(blank=True, null=True, verbose_name="Lien LinkedIn")
    twitter_link = models.URLField(blank=True, null=True, verbose_name="Lien Twitter")
    # CV téléchargeable
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True, verbose_name="Fichier CV")
    
    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profils"
    
    def __str__(self):
        return self.full_name