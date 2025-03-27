from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    default_error_messages = {
        'no_active_account': _('No active account found with the given credentials'),
        'invalid_credentials': _('Invalid email or password'),
    }

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        try:
            user = UserAccount.objects.get(email=email)
            
            if not user.check_password(password):
                raise serializers.ValidationError(
                    self.error_messages['invalid_credentials'],
                    code='invalid_credentials',
                )
                
            if not user.is_active:
                raise serializers.ValidationError(
                    self.error_messages['no_active_account'],
                    code='inactive_account',
                )
                
            refresh = self.get_token(user)
            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role,
                    'is_active': user.is_active
                }
            }
            
            return data
            
        except UserAccount.DoesNotExist:
            raise serializers.ValidationError(
                self.error_messages['no_active_account'],
                code='no_active_account',
            )   
        
class DocumentUploadSerializer(serializers.Serializer):
    document_type = serializers.ChoiceField(choices=UserAccount.DocumentType.choices)
    document_file = serializers.ImageField(
        allow_empty_file=False,
        use_url=True,
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
            'role': {'required': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return UserAccount.objects.create(**validated_data)

class CivilianStep2Serializer(serializers.ModelSerializer):
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
        fields = [
            'id', 
            'first_name', 
            'last_name', 
            'email', 
            'phone', 
            'address', 
            'role', 
            'is_active',
            'occupation',
            'family_members',
            'authority_position',
            'department_name',
            'work_location'
        ]
        read_only_fields = [
            'id', 
            'is_active',
            'email',
            'role'
        ]