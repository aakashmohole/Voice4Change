from django.urls import path
from .views import AIInsightsView

urlpatterns = [
    path("ai-insights/", AIInsightsView.as_view(), name="ai-insights"),
]
