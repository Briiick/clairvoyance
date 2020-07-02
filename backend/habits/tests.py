from django.test import TestCase
from habits.models import Habit
from users.models import User

# Create your tests here.
class HabitTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(email="normal@user.com", password="foo")
        habit = Habit.objects.create(user=user,title="Test Habit Title",description="Test Habit Description", habit_type="T")

    def test_habit_representation(self):
        habit = Habit.objects.get(id=1)
        self.assertEqual(str(habit), habit.title)