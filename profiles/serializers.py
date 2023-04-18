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
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'joined', 'first_name', 'last_name', 'dob',
            'team', 'role', 'bio', 'is_owner',
        ]
