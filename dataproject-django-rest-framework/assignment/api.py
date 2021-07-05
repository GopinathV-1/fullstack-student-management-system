from rest_framework import viewsets
from .serializers import AssignmentSerializer, UserSerializer
from .models import Assignment
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.authentication import (TokenAuthentication,
                                           BasicAuthentication)


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
    authentication_classes = [BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            self.permission_classes = [permissions.IsAdminUser, ]
        elif self.action in ['list']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        else:
            pass
        return super(self.__class__, self).get_permissions()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
