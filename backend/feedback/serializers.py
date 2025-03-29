from rest_framework import serializers
from .models import Feedback
from authentication.models import UserAccount
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount 
        fields = ['id', 'first_name', 'last_name']  # Include only necessary fields


class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'keywords']

class FeedbackUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['status', 'title', 'description', 'feedback_type', 'category', 'location', 'is_anonymous', 'urgency']
