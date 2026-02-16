from django.urls import path
from .views import (
    CustomTokenObtainPairView, SignupView, SignoutView,
    ActivateView, ResetPasswordView, ChangePasswordView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/signup/', SignupView.as_view(), name='api-signup'),
    path('api/activate/<str:uid>/<str:token>/', ActivateView.as_view(), name='api-activate'),
    path('api/reset-password/<str:uid>/<str:token>/', ResetPasswordView.as_view(), name='api-reset-password'),
    path('api/change-password/<str:uid>/<str:token>/', ChangePasswordView.as_view(), name='api-change-password'),
]