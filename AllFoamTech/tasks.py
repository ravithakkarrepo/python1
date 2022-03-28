from __future__ import absolute_import, unicode_literals

import celery
from datetime import datetime
from slp import models
from .celery import app

@celery.shared_task(bind=True)
@app.task
def start_contest(contest_id):
    print("Inside start_contest(), Celery Task")
    contest = models.Contest.objects.get(id=contest_id)
    if datetime.utcnow() < contest.contest_startdate.replace(tzinfo=None):
        return None
    else:
        contest.contest_status = "running"
        contest.save()
        print("Contest started successfully, status 'running' updated")


@celery.shared_task(bind=True)
@app.task
def end_contest(contest_id):
    print("Inside end_contest(), Celery Task")
    contest = models.Contest.objects.get(id=contest_id)
    if datetime.utcnow() < contest.contest_enddate.replace(tzinfo=None):
        return None
    else:
        contest.contest_status = "completed"
        contest.save()
        print("Contest ended successfully, status 'completed' updated")
