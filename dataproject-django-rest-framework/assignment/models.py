from django.db import models
from django.utils import timezone


class Assignment(models.Model):
    SUBJECT_CHOICES = (
        ('English', 'English'),
        ('Tamil', 'Tamil'),
        ('Maths', 'Maths'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
    )
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    staff = models.CharField(max_length=100)
    date_posted = models.DateTimeField(default=timezone.now)
    due_date = models.DateField()
    subject = models.CharField(max_length=10, choices=SUBJECT_CHOICES)

    def __str__(self):
        return self.title
