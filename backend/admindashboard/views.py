from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.utils.timezone import now, timedelta
from django.db.models import Count
from feedback.models import Feedback
from authentication.utils import CookieJWTAuthentication
from django.http import HttpResponse
from rest_framework_simplejwt.authentication import JWTAuthentication

import csv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Count
from feedback.models import Feedback

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        today = now()

        total_feedback = Feedback.objects.count()
        resolved_feedback = Feedback.objects.filter(status="resolved").count()
        pending_feedback = Feedback.objects.filter(status="pending").count()
        in_progress_feedback = Feedback.objects.filter(status="in-progress").count()

        category_stats = Feedback.objects.values("category").annotate(total=Count("id"))

        last_7_days = Feedback.objects.filter(created_at__gte=today - timedelta(days=7)).count()
        last_15_days = Feedback.objects.filter(created_at__gte=today - timedelta(days=15)).count()
        last_30_days = Feedback.objects.filter(created_at__gte=today - timedelta(days=30)).count()

        top_priority_issues = (
            Feedback.objects.filter(urgency__gte=7)
            .values("category", "title", "urgency")
            .order_by("-urgency")[:5]  # Sort by urgency (high to low)
        )

        return Response({
            "total_feedback": total_feedback,
            "resolved_feedback": resolved_feedback,
            "pending_feedback": pending_feedback,
            "in_progress_feedback": in_progress_feedback,
            "category_stats": category_stats,
            "feedback_trends": {
                "last_7_days": last_7_days,
                "last_15_days": last_15_days,
                "last_30_days": last_30_days
            },
            "top_priority_issues": top_priority_issues
        })

class AssignFeedbackView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    def post(self, request, feedback_id):
        try:
            feedback = Feedback.objects.get(id=feedback_id)
            category = request.data.get("category")

            if not category:
                return Response({"error": "Category is required"}, status=400)

            feedback.category = category
            feedback.save()
            return Response({"message": "Feedback assigned successfully"})
        except Feedback.DoesNotExist:
            return Response({"error": "Feedback not found"}, status=404)

class ExportFeedbackView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    
    
    def get(self, request):
        category_filter = request.GET.get("category", None)
        feedbacks = Feedback.objects.all()

        if category_filter:
            feedbacks = feedbacks.filter(category=category_filter)

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="feedback_export.csv"'

        writer = csv.writer(response)
        writer.writerow(["ID", "User", "Category", "Title", "Urgency", "Status", "Created At"])

        for feedback in feedbacks:
            writer.writerow([
                feedback.id, 
                feedback.user.name, 
                feedback.category, 
                feedback.title, 
                feedback.urgency, 
                "Resolved" if feedback.is_resolved else "Pending",
                feedback.created_at.strftime("%Y-%m-%d %H:%M")
            ])

        return response
