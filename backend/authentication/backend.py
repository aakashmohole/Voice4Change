from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from django.conf import settings
from .models import UserAccount
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        print("Checking Cookies:", request.COOKIES)
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        if not access_token:
            print("No access token cookie found!")
            return None
            
        try:
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            
            print(f"Authenticated user: {user.email}")
            
            if not  user.is_active:
                raise exceptions.AuthenticationFailed('User inactive or deleted')    
            return user, validated_token
        
        except UserAccount.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))