from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    message = 'You can\'t perform that action'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            return obj.owner == request.user
        return False
