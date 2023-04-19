from django.db import models
from django.contrib.auth.models import User
from profiles.models import Team

PRIORITY = [
    (0, 'Low'),
    (1, 'Normal'),
    (2, 'High')
]

STATUS = [
    (0, 'To Do'),
    (1, 'In Progress'),
    (2, 'Submitted'),
]


class Project(models.Model):
    name = models.CharField(max_length=120)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()

    class Meta:
        ordering = ['-deadline']

    def __str__(self):
        return self.name


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    description = models.TextField()
    priority = models.IntegerField(choices=PRIORITY, default=1)
    status = models.IntegerField(choices=STATUS, default=0)
    approved = models.BooleanField(default=False)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    due = models.DateTimeField()

    class Meta:
        ordering = ['status']

    def __str__(self):
        return self.name
