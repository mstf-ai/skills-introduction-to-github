from django.db import models


class Profile(models.Model):
    full_name = models.CharField(max_length=120)
    headline = models.CharField(max_length=180)
    intro = models.TextField()
    email = models.EmailField(blank=True)
    photo_url = models.URLField(blank=True)
    cta_label = models.CharField(max_length=40, default="Explore Projects")
    cta_anchor = models.CharField(max_length=40, default="#projects")

    class Meta:
        verbose_name = "Portfolio Profile"
        verbose_name_plural = "Portfolio Profile"

    def __str__(self):
        return self.full_name


class Skill(models.Model):
    name = models.CharField(max_length=80, unique=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=140)
    category = models.CharField(max_length=80)
    summary = models.TextField()
    tools = models.CharField(max_length=300, blank=True, help_text="Comma-separated tools")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "title"]

    def __str__(self):
        return self.title

    @property
    def tool_list(self):
        return [tool.strip() for tool in self.tools.split(",") if tool.strip()]
