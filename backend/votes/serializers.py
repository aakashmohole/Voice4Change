from rest_framework import serializers
from votes.models import Upvote, Downvote

class UpvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upvote
        fields = '__all__'
        
class DownvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downvote
        fields = '__all__'

