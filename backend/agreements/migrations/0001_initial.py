# Generated by Django 3.0.7 on 2020-08-11 15:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_team'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_defaulted', models.DateTimeField(blank=True)),
                ('last_checked', models.DateTimeField(auto_now_add=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team_balance', to='users.Team')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.FloatField(default=0)),
                ('transaction_date', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('balance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='balance_transactions', to='agreements.Balance')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_transactions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Agreement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.FloatField(default=0)),
                ('interval', models.CharField(choices=[('1W', 'Once Per Week'), ('1D', 'Every Day'), ('N', 'Never')], default='N', max_length=20)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team_agreements', to='users.Team')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_agreements', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
