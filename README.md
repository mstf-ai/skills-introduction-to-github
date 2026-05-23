# Sports Portfolio (Django + Python)

This repository now contains a customizable portfolio website built with **Django** and **Python**.

## Features

- Professional homepage with owner photo in the hero section
- Sports-focused portfolio content
- Full content control from **Django Admin Dashboard**
- Clear, editable structure for easy customization in any code editor

## Run locally

1. Install dependencies:

   ```bash
   python3 -m pip install -r requirements.txt
   ```

2. Apply database migrations:

   ```bash
   python3 manage.py migrate
   ```

3. Create an admin user:

   ```bash
   python3 manage.py createsuperuser
   ```

4. Start the server:

   ```bash
   python3 manage.py runserver
   ```

5. Open:

- Site: http://127.0.0.1:8000/
- Admin: http://127.0.0.1:8000/admin/

## Customize from Admin

Use Django admin to manage:

- **Portfolio Profile**: name, headline, intro, email, hero photo URL
- **Skills**: displayed skill chips and ordering
- **Projects**: title, category, summary, tools, and ordering

## Project structure

- `portfolio/models.py`: content models
- `portfolio/admin.py`: admin dashboard configuration
- `portfolio/views.py`: homepage data assembly
- `portfolio/templates/portfolio/home.html`: page template
- `portfolio/static/portfolio/styles.css`: page styles
