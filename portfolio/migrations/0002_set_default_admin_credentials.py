from django.conf import settings
from django.contrib.auth.hashers import make_password
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

    update_fields = ["password"]
    if not admin_user.is_staff:
        admin_user.is_staff = True
        update_fields.append("is_staff")
    if not admin_user.is_superuser:
        admin_user.is_superuser = True
        update_fields.append("is_superuser")

    admin_user.password = make_password("admin")
    admin_user.save(update_fields=update_fields)


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
