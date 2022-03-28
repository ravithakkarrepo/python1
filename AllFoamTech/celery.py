from __future__ import absolute_import, unicode_literals
from celery import Celery
import os
from celery import signals

CELERYD_HIJACK_ROOT_LOGGER = False


@signals.setup_logging.connect
def on_celery_setup_logging(**kwargs):
    pass


@signals.setup_logging.connect
def setup_celery_logging(**kwargs):
    pass

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AllFoamTech.settings')

app = Celery('AllFoamTech',
             broker='amqp://localhost',
             backend='amqp://',
             include=['AllFoamTech.tasks'])

app.config_from_object('django.conf:settings', namespace='celery')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


# # Optional configuration, see the application user guide.
# app.conf.update(
#     result_expires=3600,
# )

if __name__ == '__main__':
    app.start()
