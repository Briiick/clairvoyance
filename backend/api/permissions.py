from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow users of an object to edit it.
    """
    def has_permission(self, request, view):
        # return request.user and request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj):
        # return obj.user == request.user
        return True

class IsInTeam(BasePermission):
    """
    Custom permission to only allow users of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print(obj)
        return obj in request.user.team_set.all()