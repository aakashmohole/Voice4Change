from django.urls import path
from .views import UpvoteFeedbackView, TrendingFeedbackView, DownvoteFeedbackView

urlpatterns = [
    path('feedback/<int:feedback_id>/upvote/', UpvoteFeedbackView.as_view(), name='upvote-feedback'),
    path('feedback/trending/', TrendingFeedbackView.as_view(), name='trending-feedback'),
    path('feedback/<int:feedback_id>/downvote/', DownvoteFeedbackView.as_view(), name='downvote-feedback'),
]
