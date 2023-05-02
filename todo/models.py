from django.db import models
from django.contrib.auth.models import User
from profiles.models import Team

PRIORITY = [
    ('Low', 'Low'),
    ('Normal', 'Normal'),
    ('High', 'High')
]

STATUS = [
    ('To Do', 'To Do'),
    ('In Progress', 'In Progress'),
    ('Submitted', 'Submitted'),
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
    priority = models.CharField(choices=PRIORITY, max_length=6, default="Normal")
    status = models.CharField(choices=STATUS, max_length=12, default="In Progress")
    approved = models.BooleanField(default=False)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    due = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['status']

    def __str__(self):
        return self.name
