from rest_framework import generics
from reactkanban.permissions import IsOwnerOrReadOnly, IsLeadOrReadOnly
from .models import Team, Profile
from .serializers import TeamSerializer, ProfileSerializer


class TeamList(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsLeadOrReadOnly]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
