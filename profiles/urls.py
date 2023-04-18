from django.urls import path
from profiles import views


urlpatterns = [
    path('profiles/', views.ProfileList.as_view()),
    path('profile/<int:pk>/', views.ProfileDetail.as_view()),
    path('teams/', view.TeamList.as_view()),
    path('team/<int:pk>/', view.TeamDetail.as_view())
]