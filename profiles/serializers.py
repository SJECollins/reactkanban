from rest_framework import serializers
from .models import Team, Profile


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = [
            'id', 'name', 'description'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(owner='owner.username')

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'joined', 'first_name', 'last_name', 'dob',
            'team', 'role', 'bio',
        ]