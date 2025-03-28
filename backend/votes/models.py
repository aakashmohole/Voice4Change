from django.db import models
from authentication.models import UserAccount
from feedback.models import Feedback

# Create your models here.
class Upvote(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name="upvotes_list")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'feedback')  # Ensures a user can upvote only once per feedback

    def __str__(self):
        return f"{self.user.name} upvoted {self.feedback.title}"

class Downvote(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name="downvotes_list")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'feedback')  # A user can downvote only once per feedback

    def __str__(self):
        return f"{self.user.name} downvoted {self.feedback.title}"
