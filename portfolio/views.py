from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.paginator import Paginator
from .models import Project, Skill, Contact, Profile


def home(request):
    """
    Affiche la page d'accueil avec le profil, 
    les projets mis en avant et les compétences
    """
    # Récupère le premier profil (il ne devrait y en avoir qu'un)
    profile = Profile.objects.first()
    
    # Récupère les 3 projets les plus récents mis en avant
    featured_projects = Project.objects.filter(is_featured=True)[:3]
    
    # Récupère toutes les compétences groupées par catégorie
    skills = Skill.objects.all()
    
    # Prépare le contexte à passer au template
    context = {
        'profile': profile,              # Informations du profil
        'projects': featured_projects,   # Projets mis en avant
        'skills': skills,                # Liste des compétences
    }
    return render(request, 'portfolio/home.html', context)


# Vue pour la page listant tous les projets
def projects_list(request):
    """
    Affiche la liste complète de tous les projets avec pagination
    """
    # Récupère tous les projets (déjà ordonnés par date dans le modèle)
    all_projects = Project.objects.all()
    # Configure la pagination (6 projets par page)
    paginator = Paginator(all_projects, 6)
    # Récupère le numéro de page depuis l'URL (par défaut page 1)
    page_number = request.GET.get('page')
    # Obtient les projets de la page demandée
    projects = paginator.get_page(page_number)
    
    # Prépare le contexte à passer au template
    context = {
        'projects': projects,  # Objets projet paginés
    }
    return render(request, 'portfolio/projects.html', context)


# Vue pour afficher les détails d'un projet spécifique
def project_detail(request, pk):
    """
    Affiche les détails complets d'un projet spécifique
    pk = Primary Key (identifiant unique du projet)
    """
    # Récupère le projet avec l'ID spécifié, ou renvoie une erreur 404
    project = get_object_or_404(Project, pk=pk)
    
    # Récupère 3 autres projets pour les suggestions
    related_projects = Project.objects.exclude(pk=pk)[:3]
    
    # Prépare le contexte à passer au template
    context = {
        'project': project,                    # Projet principal
        'related_projects': related_projects,  # Projets similaires
    }
    
    # Rend le template avec le contexte
    return render(request, 'portfolio/project_detail.html', context)


# Vue pour la page "À propos"
def about(request):
    """
    Affiche la page À propos avec les informations du profil et les compétences
    """
    # Récupère le profil
    profile = Profile.objects.first()
    
    # Récupère toutes les compétences
    skills = Skill.objects.all()
    
    # Prépare le contexte à passer au template
    context = {
        'profile': profile,  # Informations du profil
        'skills': skills,    # Liste des compétences
    }
    return render(request, 'portfolio/about.html', context)


# Vue pour la page de contact
def contact(request):
    """
    Affiche le formulaire de contact et traite les soumissions
    """
    # Récupère le profil pour afficher les informations de contact
    profile = Profile.objects.first()
    
    # Vérifie si le formulaire a été soumis (méthode POST)
    if request.method == 'POST':
        # Récupère les données du formulaire
        name = request.POST.get('name')          # Nom de l'expéditeur
        email = request.POST.get('email')        # Email de l'expéditeur
        subject = request.POST.get('subject')    # Sujet du message
        message = request.POST.get('message')    # Contenu du message
        
        # Crée un nouveau message de contact dans la base de données
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        # Affiche un message de succès à l'utilisateur
        messages.success(request, 'Votre message a été envoyé avec succès!')
        
        # Redirige vers la page de contact (vide le formulaire)
        return redirect('contact')
    
    # Prépare le contexte à passer au template
    context = {
        'profile': profile,  # Informations du profil
    }
    
    # Rend le template avec le contexte
    return render(request, 'portfolio/contact.html', context)