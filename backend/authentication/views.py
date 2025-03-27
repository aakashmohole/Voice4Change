from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserAccount
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.utils import CookieJWTAuthentication

def set_auth_cookie(response, token, refresh_token=None):
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=token,
        httponly=True,
        secure=False,  # Change to True in production (HTTPS required)
        samesite='Lax',
        path='/'
    )
    if refresh_token:
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            httponly=True,
            secure=False,  # Change to True in production
            samesite='Lax',
            path='/'
        )

class RegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = UserAccount.objects.get(email=email)
            if not user.check_password(password):
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except UserAccount.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
        
        # Store tokens in cookies
        set_auth_cookie(response, access_token, str(refresh))

        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the refresh token from cookies
            refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])

            if refresh_token:
                # Blacklist the refresh token to prevent reuse
                token = RefreshToken(refresh_token)
                token.blacklist()

            # Clear authentication cookies
            response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])

            return response

        except Exception as e:
            return Response({"detail": "Logout failed", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]  # Use cookie-based authentication

    def get(self, request):
        user = request.user  # User is set after successful authentication
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
