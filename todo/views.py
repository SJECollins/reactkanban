from rest_framework import generics, permissions
from reactkanban.permissions import IsOwnerOrReadOnly
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TaskList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
