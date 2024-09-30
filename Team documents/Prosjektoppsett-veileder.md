**Prosjektoppsett**

**Oppsett av virtuelt miljø**

https://www.youtube.com/watch?v=t9KNwBtE5-M

Installér virtuelt miljø på maskinen:
> pip install virtualenv

Navigér til ny prosjektmappe.

Sett opp det virtuelle miljøet i prosjektmappen:
> python -m venv venv

Aktivér miljøet:
> source venv/bin/activate

For å deaktivere miljøet:
> source venv/bin/deactivate

**Oppsett av Django-prosjekt**

https://www.youtube.com/watch?v=xv_bwpA_aEA

Aktivér det virtuelle miljøet i prosjektmappen.

Installér nyeste, stabile versjon av Django:
> pip install django

Sett opp django-prosjekt:
> django-admin startproject _prosjektnavn_

Navigér til den nylagede mappen.

Sett opp app (Med vår prosjektstørrelse trengs bare én app):
> python manage.py startapp _appnavn_

Legg til _'appnavn'_ i listen INSTALLED_APPS i settings.py.

Start server:
> python manage.py runserver

**Oppsett av React**

https://www.youtube.com/watch?v=F9o4GSkSo40

Opprett reactapp (Krever Node.js og npm):
> npx create-react-app _appnavn_

Navigér til den nylagede mappen.

Kjør bygg:
> npm run build

I settings.py: \
	Legg til __import os__ som øverste import. \
	Legg til __os.path.join(BASE_DIR, '<appnavn>/build')__ under DIRS under TEMPLATES. \
	Legg til __STATICFILES_DIRS = [os.path.join(BASE_DIR, '<appnavn>/build/static')]__ nederst i filen.

I urls.py: \
	Legg til __from django.views.generic import TemplateView__ under importene. \
	Legg til __path('', TemplateView.as_view(template_name='index.html'))__ i listen urlpatterns.


Etter hver endring på reactappen, kjør fra reactappens mappe:
> npm run build

Husk å starte serveren. \
Reactappen kjører på http://localhost:8000