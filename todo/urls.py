from django.urls import path
from todo import views


urlpatterns = [
    path('projects/', views.ProjectList.as_view()),
    path('project/<int:pk>', views.ProjectDetail.as_view()),
    path('tasks/', views.TaskList.as_view()),
    path('task/<int:pk>', views.TaskDetail.as_view()),
]
