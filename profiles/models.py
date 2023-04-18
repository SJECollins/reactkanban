from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


ROLES = [
    ('Team Lead', 'Team Lead'),
    ('Team Member', 'Team Member')
]


class Team(models.Model):
    name = models.CharField(max_length=240)
    description = models.TextField()
    lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    joined = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=120, blank=True)
    last_name = models.CharField(max_length=120, blank=True)
    dob = models.DateField(null=True, blank=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)
    role = models.CharField(choices=ROLES, max_length=15, default='Team Member')
    bio = models.TextField()

    class Meta:
        ordering = ['-joined']

    def __str__(self):
        return self.owner


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
