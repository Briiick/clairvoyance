# Generated by Django 3.0.7 on 2020-08-10 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20200707_2123'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='future_tasks',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='general_update',
            field=models.TextField(default='Example General Update'),
            preserve_default=False,
        ),
    ]