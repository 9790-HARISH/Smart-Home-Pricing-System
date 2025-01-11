from rest_framework import serializers
from .models import React

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model=React
        fields=['i1','i2','i3','i4','i5']
