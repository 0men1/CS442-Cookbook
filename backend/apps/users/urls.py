from django.urls import path
from apps.users.views import UserLoginView, UserRegisterView, UserView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('<uuid:id>/', UserView.as_view(), name='user-by-id'),
    path('username/<str:username>/', UserView.as_view(), name='user-by-username'),
    path('email/<str:email>/', UserView.as_view(), name='user-by-email'),
]

