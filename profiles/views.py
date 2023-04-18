from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Team, Profile


class TeamList(APIView):
    def get(self, request):
        teams = Team.objects.all()
        return response(teams)


class ProfileList(APIView):
    def get(self, request):
        profiles = Profile.objects.all()
        return Response(profiles)


class ProfileDetail(APIView):
    def get_object(self, pk):
        try:
            profile = Profile.objects.get(pk=pk)
            return profile
        except Profile.DoesNotExist:
            raise Http404
