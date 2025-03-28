from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        if not token:
            print("❌ No token found in cookies")
            return None  # No authentication

        print("✅ Token from cookie:", token)

        try:
            validated_token = self.get_validated_token(token)
            print("✅ Token is valid")
            user = self.get_user(validated_token)
            return (user, validated_token)
        except Exception as e:
            print(f"❌ Token validation error: {str(e)}")
            raise AuthenticationFailed("Invalid or expired token")
