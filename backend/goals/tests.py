from django.test import TestCase
from goals.models import Goal
from users.models import User

# Create your tests here.
class GoalTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(email="normal@user.com", password="foo")
        goal = Goal.objects.create(user=user,title="Test Goal Title",description="Test Goal Description")

    def test_note_representation(self):
        goal = Goal.objects.get(id=1)
        self.assertEqual(str(goal), goal.title)