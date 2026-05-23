from django.conf import settings
from django.db import migrations


def set_default_admin_credentials(apps, schema_editor):
    User = apps.get_model("auth", "User")
    admin_user, _ = User.objects.get_or_create(
        username="admin",
        defaults={
            "is_staff": True,
            "is_superuser": True,
        },
    )

    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.set_password("admin")
    admin_user.save(update_fields=["password", "is_staff", "is_superuser"])


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(
            set_default_admin_credentials,
            migrations.RunPython.noop,
        ),
    ]
