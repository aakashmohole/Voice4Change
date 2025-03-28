from rest_framework import serializers
from .models import UserAccount

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = UserAccount
        fields = [
            'first_name', 'last_name', 'email', 'phone', 'address', 
            'password', 'role', 'id_proof_type', 'id_proof_file', 
            'authority_position', 'government_id', 'department_name', 
            'work_location', 'occupation', 'family_members'
        ]

    def create(self, validated_data):
        user = UserAccount(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = True  # Activate user upon registration
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        exclude = ['password']
