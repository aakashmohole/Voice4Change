from django.shortcuts import render
from feedback.serializers import FeedbackSerializer
# Create your views here.
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from feedback.models import Feedback
from .models import  Upvote, Downvote
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UpvoteSerializer, DownvoteSerializer
from authentication.utils import CookieJWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated



class UpvoteFeedbackView(generics.CreateAPIView):
    serializer_class = UpvoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, feedback_id):
        feedback = Feedback.objects.get(id=feedback_id)
        user = request.user

        # Check if the user already upvoted
        if Upvote.objects.filter(user=user, feedback=feedback).exists():
            return Response({'message': 'You have already upvoted this feedback.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create upvote
        Upvote.objects.create(user=user, feedback=feedback)
        feedback.update_upvotes()

        return Response({'message': 'Feedback upvoted successfully'}, status=status.HTTP_201_CREATED)

class TrendingFeedbackView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Feedback.objects.order_by('-upvotes')[:10]  # Show top 10 trending feedback


class DownvoteFeedbackView(generics.CreateAPIView):
    serializer_class = DownvoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, feedback_id):
        feedback = Feedback.objects.get(id=feedback_id)
        user = request.user

        # Check if the user already downvoted
        if Downvote.objects.filter(user=user, feedback=feedback).exists():
            return Response({'message': 'You have already downvoted this feedback.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create downvote
        Downvote.objects.create(user=user, feedback=feedback)
        feedback.update_downvotes()

        return Response({'message': 'Feedback downvoted successfully'}, status=status.HTTP_201_CREATED)
