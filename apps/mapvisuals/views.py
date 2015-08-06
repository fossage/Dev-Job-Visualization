from apps.data_storage.models import WriteOnly, DiceJobs
from django.http import HttpResponse, JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
import json
from django.shortcuts import render
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


#takes request and grabs all data from database
def index(request):
	content = {
	'info': WriteOnly.objects.all()
	}
	return render(request, 'mapvisuals/index.html', content)

def toGeo(request):
	data = WriteOnly.objects.all()

	def toGeoJson(data):
		geo = {
			"type": "FeatureCollection",
			"features": [],
		}

		for dat in data:
			geoObj = {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [dat.latitude, dat.longitude]
				},
				"properties": {
					"numJobs": dat.num_jobs,
					"name": dat.city_name,
					"stateAbbreviation": dat.stateAbbreviation,
					"stateName": dat.stateName,
					"id": 1147394
				}
			}
			geo['features'].append(geoObj)
		return geo

	data = toGeoJson(data)

	return HttpResponse(json.dumps(data), content_type='application/json')


def statedata(request):
	GeoJson = open(os.path.abspath('states.json'));
	CityData = WriteOnly.objects.all()
	AllStates = json.load(GeoJson)
	print(AllStates)
	for state in AllStates['features']:
	  for city in CityData:
	     if city.stateName == state['properties']['name']:
	        if 'numJobs' in state['properties']:
	           print 'exists'
	           state['properties']['numJobs'] += city.num_jobs
	        else:
	           print 'not exists'
	           state['properties']['numJobs'] = city.num_jobs
	           
	GeoJson = json.dumps(AllStates)
	return HttpResponse(GeoJson , content_type='application/json')

def jensload(request):
	return render(request, 'mapvisuals/index.html')

def jens(request):
	print "We made it to jens"
	cities = WriteOnly.objects.filter(job_title ="Front End")[:10]
	print cities
	cityList = list()
	for city in cities:
		cityList.append(city.city_name)

	totalFront = WriteOnly.objects.filter(job_title = "Front End", city_name__in =cityList).order_by('city_name')
	totalBack = WriteOnly.objects.filter(job_title = "Back End", city_name__in =cityList).order_by('city_name')
	totalFull = WriteOnly.objects.filter(job_title = "Full Stack", city_name__in =cityList).order_by('city_name')
	
	results = list()
	for x in range(0, 10):
		data = {
			'State': totalFront[x].city_name, 
			'freq': {
				'Front': totalFront[x].num_jobs,
				'Back': totalBack[x].num_jobs,
				'Full': totalFull[x].num_jobs,
			},
		}
		results.append(data)

	return HttpResponse(json.dumps(results), content_type='application/json')

def getSalary(request):
	data = serializers.serialize('json', DiceJobs.objects.all())
	return HttpResponse(data, content_type='application/json')











