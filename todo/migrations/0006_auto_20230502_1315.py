# Generated by Django 3.2.18 on 2023-05-02 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_alter_task_due'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.CharField(choices=[('Low', 'Low'), ('Normal', 'Normal'), ('High', 'High')], default='Normal', max_length=6),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('To Do', 'To Do'), ('In Progress', 'In Progress'), ('Submitted', 'Submitted')], default='In Progress', max_length=12),
        ),
    ]