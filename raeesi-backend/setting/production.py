from .base import *

DEBUG = False

ALLOWED_HOSTS = ['107.180.112.156','totsworld.co.in','api.totsworld.co.in']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Other production-specific settings...
