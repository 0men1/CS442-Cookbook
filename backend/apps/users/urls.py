from django.urls import path
from apps.users.views import UserView

urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>/', UserView.as_view(), name='user-by-id'),
    path('username/<str:username>/', UserView.as_view(), name='user-by-username'),
    path('email/<str:email>/', UserView.as_view(), name='user-by-email'),
]
