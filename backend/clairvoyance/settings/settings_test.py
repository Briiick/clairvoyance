from .settings_dev import *

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#database

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': ':memory:',
  }
}