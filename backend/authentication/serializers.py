from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add extra responses here
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'role': self.user.role,
            'is_active': self.user.is_active
        }
        return data
    
class DocumentUploadSerializer(serializers.Serializer):
    document_type = serializers.ChoiceField(choices=UserAccount.DocumentType.choices)
    document_file = serializers.ImageField(
        allow_empty_file=False,
        use_url=True,  # This will return full Cloudinary URL
        required=True
    )

class Step1RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'address': {'required': True},
            'role' : {'required' : True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return UserAccount.objects.create(**validated_data)

class Step2Mixin:
    def handle_file_upload(self, instance, file_data, field_prefix):
        if file_data:
            # Cloudinary automatically handles upload when saving to model
            setattr(instance, f'{field_prefix}_type', file_data['document_type'])
            setattr(instance, f'{field_prefix}_file', file_data['document_file'])
        return instance


class CivilianStep2Serializer(Step2Mixin, serializers.ModelSerializer):
    id_proof = DocumentUploadSerializer()

    class Meta:
        model = UserAccount
        fields = ['id_proof', 'occupation', 'family_members']
        extra_kwargs = {
            'occupation': {'required': True},
            'family_members': {'required': True}
        }

    def update(self, instance, validated_data):
        id_proof_data = validated_data.pop('id_proof')
        
        instance = self.handle_file_upload(instance, id_proof_data, 'id_proof')
        instance.id_proof_type = id_proof_data['document_type']
        instance.id_proof_file = id_proof_data['document_file']
        instance.registration_step = 2
        instance.is_active = True
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class AuthorityStep2Serializer(serializers.ModelSerializer):
    id_proof = DocumentUploadSerializer()

    class Meta:
        model = UserAccount
        fields = ['id_proof', 'authority_position', 'government_id', 'department_name', 'work_location']
        extra_kwargs = {
            'authority_position': {'required': True},
            'government_id': {'required': True},
            'department_name': {'required': True},
            'work_location': {'required': True}
        }

    def update(self, instance, validated_data):
        id_proof_data = validated_data.pop('id_proof')
        
        instance.id_proof_type = id_proof_data['document_type']
        instance.id_proof_file = id_proof_data['document_file']
        instance.registration_step = 2
        instance.is_active = True
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'address', 'role', 'is_active']
        read_only_fields = ['id', 'is_active']