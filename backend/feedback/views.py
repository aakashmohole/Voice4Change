from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Feedback
from .serializers import FeedbackSerializer, FeedbackUpdateSerializer
from .filters import FeedbackFilter
from authentication.utils import CookieJWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
class FeedbackCreateView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = []

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FeedbackListView(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = FeedbackFilter
    search_fields = ['title', 'description', 'category', 'location']
    ordering_fields = ['created_at', 'upvotes', 'urgency']

class FeedbackDetailView(generics.RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.AllowAny]

class FeedbackUpdateView(generics.UpdateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackUpdateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication] 

    def get_queryset(self):
        return Feedback.objects.filter(user=self.request.user)

class FeedbackDeleteView(generics.DestroyAPIView):
    queryset = Feedback.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Feedback.objects.filter(user=self.request.user)
