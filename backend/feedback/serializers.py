from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'keywords']

class FeedbackUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['status', 'title', 'description', 'feedback_type', 'category', 'location', 'is_anonymous', 'urgency']
