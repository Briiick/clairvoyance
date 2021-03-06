from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.permissions import IsOwner
from posts.serializers import PostSerializer
from posts.models import Post

# Create your views here.
class PostsList(APIView):
    permission_classes = [IsOwner]

    def get(self, request, format=None):
        team_id = request.GET.get('team')
        if team_id:
            posts = Post.objects.filter(team=team_id)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        posts = Post.objects.filter(user=request.user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostsDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']