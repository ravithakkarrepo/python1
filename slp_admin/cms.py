from django.shortcuts import render, redirect
from django.http import HttpResponse
from slp.models import Admin,PostCms
from .forms import CmsForm

def cms_table(request):
	try:
		is_admin = True
		is_merchant = False
		id = request.session['aid']
		a = Admin.objects.filter(id=id).get()
		name = a.full_name
		name = name.capitalize()
		cms_list = PostCms.objects.all()
		return render(request,"cms_list.html",{"name":name,"cms_list":cms_list,"is_admin":True,"cms_class":True,})
	except Exception as e:
		print('Exception in video',e)
		return redirect('login_error')

def add_cms(request):
	id = request.session['aid']
	a = Admin.objects.filter(id=id).get()
	full_name = a.full_name
	full_name = full_name.capitalize()
	if request.method == 'POST':
		form = CmsForm(request.POST)
		if form.is_valid():
			todo = form.save()
			# form1 = CmsForm()
			# cms_class = True
			return render(request, 'add-cms.html', {'form': form, "is_admin": True, 'name': full_name, "cms_added": True,"cms_class":True})
			# return redirect("cmslist")
	else:
		form = CmsForm()
	return render(request, 'add-cms.html', {'form': form, "is_admin": True, 'name': full_name,"cms_class":True})

def edit_cms(request,id=None):
	# is_merchant = False
	# is_admin = True
	# id = request.session['aid']
	values = Admin.objects.filter(id=1).get()
	full_name = values.full_name
	full_name = full_name.capitalize()
	cmsedit=PostCms.objects.get(id=id)
	if request.method=="POST":
		form = CmsForm(request.POST,instance=cmsedit)
		if form.is_valid():
			form.save()
			return render(request, 'cms_edit.html', {'form': form, 'is_admin': True, 'name': full_name, "cms_edited": True})
			# return redirect("cmslist")
	else:
		form = CmsForm(instance=cmsedit)
	return render(request, 'cms_edit.html', {'form': form,'is_admin': True,'name':full_name})

def delete_cms(request,id=None):
	cmsdelete=PostCms.objects.get(id=id)
	cmsdelete.delete()
	return redirect("cmslist")

def each_cms(request,id):
	cmsdisp=PostCms.objects.get(id=id)
	return render(request,"terms_Condition.html",{"cmsdisp":cmsdisp})