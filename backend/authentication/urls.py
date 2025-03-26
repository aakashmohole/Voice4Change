from django.urls import path
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    LogoutView,
    Step1RegistrationView,
    Step2RegistrationView,
    UserProfileView,
    CheckRegistrationStepView,
)

urlpatterns = [
    # Authentication endpoints
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # Registration endpoints
    path('register/step1/', Step1RegistrationView.as_view(), name='register_step1'),
    path('register/step2/<int:pk>/', Step2RegistrationView.as_view(), name='register_step2'),
    path('register/check-step/<int:pk>/', CheckRegistrationStepView.as_view(), name='check_registration_step'),
    
    # Profile endpoints
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    
    # Additional utility endpoints
    # path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    # path('reset-password/', PasswordResetRequestView.as_view(), name='reset_password'),
    # path('reset-password/confirm/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
]