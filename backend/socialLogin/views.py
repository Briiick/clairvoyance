from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
import requests
# from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User

class SocialLoginView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        payload = {'access_token': request.data.get("access_token")}  # validate the token
        r = requests.get('https://www.googleapis.com/oauth2/v1/tokeninfo', params=payload)
        data = json.loads(r.text)

        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(content)

        # create user if not exist
        try:
            user = User.objects.get(email=data['email'])
            token = Token.objects.get(user=user)
        except User.DoesNotExist:
            user = User()
            user.username = data['email']
            # provider random default password
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = data['email']
            user.save()
            token = Token.objects.create(user=user)

        response = {}
        response['email'] = user.email
        response['token'] = token.key
        return Response(response)