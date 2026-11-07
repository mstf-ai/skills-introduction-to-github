from django.urls import path

from .views import home

urlpatterns = [
    path("", home, name="home"),
    path("https://mstf-ai.github.io/skills-introduction-to-github/", home, name="gitHubPagesHome"),
]
