from rest_framework import generics, permissions
from reactkanban.permissions import IsOwnerOrReadOnly, IsLeadOrReadOnly
from .models import Team, Profile
from .serializers import TeamSerializer, ProfileSerializer


class TeamList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def perform_create(self, serializer):
        serializer.save(lead=self.request.user)


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
