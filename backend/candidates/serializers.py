from rest_framework import serializers
from .models import Candidate

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ["id", "name", "email", "phone_number", "current_status", "resume_link", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
