from django_filters import rest_framework as filters
from .models import Feedback
from django.db.models import Q

class FeedbackFilter(filters.FilterSet):
    search = filters.CharFilter(method='custom_search', label="Search")
    min_upvotes = filters.NumberFilter(field_name='upvotes', lookup_expr='gte')
    max_upvotes = filters.NumberFilter(field_name='upvotes', lookup_expr='lte')
    date_range = filters.DateFromToRangeFilter(field_name='created_at')
    
    class Meta:
        model = Feedback
        fields = {
            'feedback_type': ['exact'],
            'category': ['exact'],
            'status': ['exact'],
            'urgency': ['exact'],
            'sentiment_score': ['gte', 'lte'],
        }
    
    def custom_search(self, queryset, name, value):
        return queryset.filter(
            Q(keywords__icontains=value) |
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(themes__contains=[value.lower()])
        )