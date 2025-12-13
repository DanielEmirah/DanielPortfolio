from django.contrib import admin
from .models import Project, Skill, Contact, Profile


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des projets
    list_display = ('title', 'technologies', 'created_date', 'is_featured')
    # Filtres disponibles dans la barre latérale
    list_filter = ('is_featured', 'created_date')
    # Barre de recherche (cherche dans title et description)
    search_fields = ('title', 'description', 'technologies')
    # Champs modifiables directement depuis la liste
    list_editable = ('is_featured',)
    # Ordre d'affichage par défaut (du plus récent au plus ancien)
    ordering = ('-created_date',)
    # Organisation des champs dans le formulaire d'édition
    fieldsets = (
        ('Informations principales', {
            'fields': ('title', 'description', 'detailed_description', 'image')
        }),
        ('Technologies et liens', {
            'fields': ('technologies', 'project_url', 'github_url')
        }),
        ('Options', {
            'fields': ('is_featured', 'created_date')
        }),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des compétences
    list_display = ('name', 'category', 'level', 'icon')
    # Filtres disponibles dans la barre latérale
    list_filter = ('category',)
    # Barre de recherche
    search_fields = ('name', 'category')
    # Champs modifiables directement depuis la liste
    list_editable = ('level',)
    # Ordre d'affichage par catégorie puis par nom
    ordering = ('category', 'name')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste des messages
    list_display = ('name', 'email', 'subject', 'sent_date', 'is_read')
    # Filtres disponibles dans la barre latérale
    list_filter = ('is_read', 'sent_date')
    # Barre de recherche
    search_fields = ('name', 'email', 'subject', 'message')
    # Champs modifiables directement depuis la liste
    list_editable = ('is_read',)
    # Ordre d'affichage (du plus récent au plus ancien)
    ordering = ('-sent_date',)
    # Champs en lecture seule (non modifiables)
    readonly_fields = ('name', 'email', 'subject', 'message', 'sent_date')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # Colonnes affichées dans la liste
    list_display = ('full_name', 'title', 'email', 'phone')
    # Barre de recherche
    search_fields = ('full_name', 'title', 'email')
    # Organisation des champs dans le formulaire d'édition
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('full_name', 'title', 'bio', 'profile_picture')
        }),
        ('Contact', {
            'fields': ('email', 'phone')
        }),
        ('Réseaux sociaux', {
            'fields': ('github_link', 'linkedin_link', 'twitter_link')
        }),
        ('Documents', {
            'fields': ('cv_file',)
        }),
    )