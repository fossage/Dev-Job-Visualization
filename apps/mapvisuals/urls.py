from django.conf.urls import include, url
from apps.mapvisuals import views
#brings to mapvisuals views and directs to index method
urlpatterns = [
	url(r"^$", views.index, name='index'),
	url(r'^salarydata$', views.getSalary, name='salary'),
	url(r"^mapdata$", views.toGeo, name='mapdata'),
	url(r"^statedata$", views.statedata, name='statedata'),
	url(r'^jensrocks/', views.jens, name='jensispretty'),
	url(r'^jensload/', views.jensload, name="jensLoad"),
]