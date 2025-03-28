from django.urls import path
from .views import AdminDashboardView, AssignFeedbackView, ExportFeedbackView

urlpatterns = [
    path("dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path("assign-feedback/<int:feedback_id>/", AssignFeedbackView.as_view(), name="assign-feedback"),
    path("feedback-export/", ExportFeedbackView.as_view(), name="feedback-export"),
]
