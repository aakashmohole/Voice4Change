from django.db import models
from django.utils import timezone
from authentication.models import UserAccount

# Create your models here.

class Feedback(models.Model):
    class FeedbackType(models.TextChoices):
        COMPLAINT = 'COMPLAINT', 'Complaint'
        SUGGESTION = 'SUGGESTION', 'Suggestion'
        COMMENT = 'COMMENT', 'General Comment'
        IDEA = 'IDEA', 'Policy Idea'
        
    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
        RESOLVED = 'RESOLVED', 'Resolved'
        REJECTED = 'REJECTED', 'Rejected'
    
    class Category(models.TextChoices):
        INFRASTRUCTURE = 'INFRASTRUCTURE', 'Infrastructure (Roads, Bridges, etc.)'
        TRANSPORTATION = 'TRANSPORTATION', 'Transportation'
        EDUCATION = 'EDUCATION', 'Education'
        HEALTHCARE = 'HEALTHCARE', 'Healthcare'
        SANITATION = 'SANITATION', 'Sanitation & Waste Management'
        WATER = 'WATER', 'Water Supply'
        ELECTRICITY = 'ELECTRICITY', 'Electricity'
        PUBLIC_SAFETY = 'PUBLIC_SAFETY', 'Public Safety'
        ENVIRONMENT = 'ENVIRONMENT', 'Environment'
        HOUSING = 'HOUSING', 'Housing'
        TAXATION = 'TAXATION', 'Taxation'
        WELFARE = 'WELFARE', 'Social Welfare'
        EMPLOYMENT = 'EMPLOYMENT', 'Employment'
        AGRICULTURE = 'AGRICULTURE', 'Agriculture'
        TOURISM = 'TOURISM', 'Tourism'
        CULTURE = 'CULTURE', 'Arts & Culture'
        OTHER = 'OTHER', 'Other'
    
         
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name='feedbacks')
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    feedback_type = models.CharField(max_length=20, choices=FeedbackType.choices)
    category = models.CharField(max_length=20, choices=Category.choices)  # Updated to use choices
    location = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_anonymous = models.BooleanField(default=False)
    sentiment_score = models.FloatField(null=True, blank=True)
    themes = models.JSONField(default=list, blank=True)
    
     # Add these new fields
    keywords = models.CharField(max_length=255, blank=True)  # For optimized searching
    urgency = models.CharField(
        max_length=10,
        choices=[('LOW', 'Low'), ('MEDIUM', 'Medium'), ('HIGH', 'High')],
        default='MEDIUM'
    )
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    
    def save(self, *args, **kwargs):
        # Auto-generate keywords for better search
        self.keywords = ' '.join([
            self.title.lower(),
            self.description.lower(),
            self.get_category_display().lower(),
            self.get_feedback_type_display().lower()
        ])
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.title} - {self.get_feedback_type_display()}"