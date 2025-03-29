from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from datetime import timedelta
from feedback.models import Feedback
from django.db.models import Count
from authentication.utils import CookieJWTAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
import google.generativeai as genai
from django.conf import settings

# Configure AI API
genai.configure(api_key=settings.GEMINI_API_KEY)

class AIInsightsView(APIView):
    # authentication_classes = [CookieJWTAuthentication]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now()
        last_30_days = today - timedelta(days=30)

        # Emerging Issues: Categories with highest increase in complaints
        category_trend = (
            Feedback.objects.filter(created_at__gte=last_30_days)
            .values("category")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        # Sentiment Trends: Fetch sentiment scores and analyze trends
        sentiment_trend = (
            Feedback.objects.filter(created_at__gte=last_30_days)
            .values("sentiment_score")
        )

        # Geographic Hotspots: Identify locations with most complaints
        location_trend = (
            Feedback.objects.filter(created_at__gte=last_30_days)
            .values("location")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        # AI-Powered Insights using Gemini
        feedback_texts = list(Feedback.objects.values_list("description", flat=True))
        ai_analysis = self.get_ai_insights(feedback_texts)

        return Response({
            "emerging_issues": list(category_trend[:5]),
            "sentiment_trends": list(sentiment_trend),
            "geographic_hotspots": list(location_trend[:5]),
            "ai_analysis": ai_analysis,
        })

    def get_ai_insights(self, feedback_texts):
        """Uses AI to analyze feedback trends."""
        if not feedback_texts:
            return "No insights available."
        
        prompt = (
            "Analyze the following feedback data and provide a brief AI-generated insight. "
            "Focus on emerging trends, top concerns, and public sentiment shifts:\n\n"
            + "\n".join(feedback_texts[:100])  # Limit to avoid token overflow
        )
        
        try:
            model = genai.GenerativeModel("models/gemini-1.5-flash")
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"AI analysis failed: {e}"
