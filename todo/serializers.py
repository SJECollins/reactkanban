from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    team_name = serializers.ReadOnlyField(source='team.name')
    is_owner = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_created(self, obj):
        return naturaltime(obj.created)

    class Meta:
        model = Project
        fields = [
            'id', 'owner', 'is_owner', 'team', 'team_name', 'created',
            'deadline', 'name', 'description'
        ]


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    added = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_added(self, obj):
        return naturaltime(obj.added)

    def get_updated(self, obj):
        return naturaltime(obj.updated)

    class Meta:
        model = Task
        fields = [
            'id', 'owner', 'is_owner', 'name', 'description', 'priority',
            'status', 'approved', 'added', 'updated', 'due', 'project'
        ]


class TaskDetailSerializer(TaskSerializer):
    project = serializers.ReadOnlyField(source='project.id')
