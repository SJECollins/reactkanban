# Generated by Django 3.2.18 on 2023-05-02 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_auto_20230502_1228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='due',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]