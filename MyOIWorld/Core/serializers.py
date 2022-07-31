from rest_framework import serializers

from Core.models import BasicUser


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicUser
        fields = "__all__"
