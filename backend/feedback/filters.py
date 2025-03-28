import django_filters
from .models import Feedback

class FeedbackFilter(django_filters.FilterSet):
    feedback_type = django_filters.CharFilter(field_name='feedback_type', lookup_expr='iexact')
    category = django_filters.CharFilter(field_name='category', lookup_expr='iexact')
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')
    urgency = django_filters.CharFilter(field_name='urgency', lookup_expr='iexact')
    search = django_filters.CharFilter(method='filter_search')

    def filter_search(self, queryset, name, value):
        return queryset.filter(keywords__icontains=value.lower())

    class Meta:
        model = Feedback
        fields = ['feedback_type', 'category', 'status', 'urgency']
