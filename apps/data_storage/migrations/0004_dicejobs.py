# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_storage', '0003_auto_20150728_2302'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiceJobs',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.TextField()),
                ('skills', models.TextField()),
                ('salary', models.IntegerField()),
                ('location', models.TextField()),
                ('posted', models.TextField()),
                ('created_at', models.DateField()),
            ],
            options={
                'db_table': 'DiceJobs',
            },
        ),
    ]
