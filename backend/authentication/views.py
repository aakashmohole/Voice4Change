from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import UserAccount
from .serializers import (
    Step1RegistrationSerializer,
    CivilianStep2Serializer,
    AuthorityStep2Serializer,
    UserAccountSerializer,
    CustomTokenObtainPairSerializer
)

class SetJWTCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data and 'access' in response.data:
            access_token = response.data['access']
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=access_token,
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=True,
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )
            del response.data['access']
        
        if response.data and 'refresh' in response.data:
            refresh_token = response.data['refresh']
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=True,
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                path='/api/auth/refresh/',
            )
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)

class CustomTokenObtainPairView(SetJWTCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(SetJWTCookieMixin, TokenRefreshView):
    pass

class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        response = Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        
        # Clear access token cookie
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        # Clear refresh token cookie
        response.delete_cookie('refresh_token')
        
        return response

class Step1RegistrationView(generics.CreateAPIView):
    serializer_class = Step1RegistrationSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'user': UserAccountSerializer(user).data,
            'message': 'Step 1 completed. Proceed to step 2.',
            'next_step': f'/api/auth/register/step2/{user.id}/'
        }, status=status.HTTP_201_CREATED)

class Step2RegistrationView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    queryset = UserAccount.objects.all()
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_serializer_class(self):
        user = self.get_object()
        if user.role == UserAccount.Role.CIVILIAN:
            return CivilianStep2Serializer
        return AuthorityStep2Serializer

    def patch(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            
            if instance.registration_step != 1:
                return Response(
                    {'error': 'Invalid registration step'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Handle file parsing differently for Cloudinary
            data = request.data.dict() if hasattr(request.data, 'dict') else request.data
            if 'id_proof[document_file]' in request.FILES:
                data['id_proof'] = {
                    'document_type': data.get('id_proof[document_type]'),
                    'document_file': request.FILES['id_proof[document_file]']
                }
            
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            
            user = serializer.save()
            # ... rest of your view code ...
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate tokens for automatic login
        refresh = RefreshToken.for_user(user)
        response_data = {
            'user': UserAccountSerializer(user).data,
            'message': 'Registration completed successfully!'
        }
        
        response = Response(response_data, status=status.HTTP_200_OK)
        
        # Set cookies
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=str(refresh.access_token),
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=True,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=True,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            path='/api/auth/refresh/',
        )
        
        return response

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserAccountSerializer

    def get_object(self):
        return self.request.user

class CheckRegistrationStepView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response({
            'registration_step': instance.registration_step,
            'role': instance.role,
            'next_step': f'/api/auth/register/step2/{instance.id}/' if instance.registration_step == 1 else None
        })