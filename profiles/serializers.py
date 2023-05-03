from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Team, Profile


class TeamSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='lead.username')
    lead_name = serializers.ReadOnlyField(source='lead.profile.get_full_name')
    is_lead = serializers.SerializerMethodField()

    def get_is_lead(self, obj):
        request = self.context['request']
        return request.user == obj.lead

    class Meta:
        model = Team
        fields = [
            'id', 'name', 'description', 'lead', 'lead_name', 'is_lead',
            'owner'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    joined = serializers.SerializerMethodField()
    team_name = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_joined(self, obj):
        return naturaltime(obj.joined)

    def get_team_name(self, obj):
        if obj.team is not None:
            return obj.team.name
        else:
            return "No team"

    def get_full_name(self, obj):
        return obj.first_name + " " + obj.last_name

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'joined', 'first_name', 'last_name', 'dob',
            'team', 'team_name', 'role', 'bio', 'is_owner', 'full_name'
        ]
