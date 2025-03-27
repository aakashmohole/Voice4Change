from django.urls import path
from .views import (
    FeedbackCreateView,
    FeedbackListView,
    FeedbackDetailView,
    FeedbackUpdateView,
    FeedbackDeleteView
)

urlpatterns = [
    path('create/', FeedbackCreateView.as_view(), name='create-feedback'),
    path('list/', FeedbackListView.as_view(), name='list-feedbacks'),
    path('<int:pk>/', FeedbackDetailView.as_view(), name='view-feedback'),
    path('update/<int:pk>/', FeedbackUpdateView.as_view(), name='update-feedback'),
    path('delete/<int:pk>/', FeedbackDeleteView.as_view(), name='delete-feedback'),
]