from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow users of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class IsInObjectTeam(BasePermission):
    """
    Custom permission to only allow users of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.team in request.user.team_list.all()

class IsInTeam(BasePermission):
    """
    Custom permission to only allow users of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj in request.user.team_list.all()