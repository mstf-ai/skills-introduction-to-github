from django.shortcuts import render

from .models import Profile, Project, Skill

DEFAULT_PROFILE = {
    "full_name": "Mustafa",
    "headline": "Sports-focused Developer | Django & Python",
    "intro": "I build clean, professional portfolio and sports-focused web experiences using Django and Python.",
    "email": "hello@example.com",
    "photo_url": "https://github.com/user-attachments/assets/9120fc56-bd73-4811-a38c-39447b8a0402",
    "cta_label": "View Projects",
    "cta_anchor": "#projects",
}

DEFAULT_SKILLS = [
    "Django",
    "Python",
    "Sports Portfolio Design",
    "Admin Dashboard Management",
    "Responsive UI",
]

DEFAULT_PROJECTS = [
    {
        "title": "Sports Club Management Platform",
        "category": "Sports",
        "summary": "Built a complete platform for teams, schedules, and player profiles.",
        "tools": ["Django", "Python", "SQLite"],
    },
    {
        "title": "Coach Booking Website",
        "category": "Sports Services",
        "summary": "Designed a booking workflow for private trainers and sports consultants.",
        "tools": ["Django", "Python", "HTML/CSS"],
    },
    {
        "title": "Training Progress Tracker",
        "category": "Analytics",
        "summary": "Created athlete progress tracking with clear data views for coaches.",
        "tools": ["Python", "Django Admin", "Charts"],
    },
]


def home(request):
    profile = Profile.objects.first()
    skills_queryset = Skill.objects.all()
    projects_queryset = Project.objects.all()

    profile_data = {
        "full_name": profile.full_name if profile else DEFAULT_PROFILE["full_name"],
        "headline": profile.headline if profile else DEFAULT_PROFILE["headline"],
        "intro": profile.intro if profile else DEFAULT_PROFILE["intro"],
        "email": profile.email if profile and profile.email else DEFAULT_PROFILE["email"],
        "photo_url": profile.photo_url if profile and profile.photo_url else DEFAULT_PROFILE["photo_url"],
        "cta_label": profile.cta_label if profile and profile.cta_label else DEFAULT_PROFILE["cta_label"],
        "cta_anchor": profile.cta_anchor if profile and profile.cta_anchor else DEFAULT_PROFILE["cta_anchor"],
    }

    skills = [skill.name for skill in skills_queryset] if skills_queryset else DEFAULT_SKILLS

    if projects_queryset:
        projects = [
            {
                "title": project.title,
                "category": project.category,
                "summary": project.summary,
                "tools": project.tool_list,
            }
            for project in projects_queryset
        ]
    else:
        projects = DEFAULT_PROJECTS

    return render(
        request,
        "portfolio/home.html",
        {
            "profile": profile_data,
            "skills": skills,
            "projects": projects,
        },
    )
