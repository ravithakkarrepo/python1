 
from django import forms
from slp.models import PostCms


class CmsForm(forms.ModelForm):
	class Meta:
		model=PostCms
		fields= ("language","title","content",)
	def __init__(self, *args, **kwargs):
		super(CmsForm, self).__init__(*args, **kwargs)
		self.fields["language"].choices = [("", "Please choose language"),] + list(self.fields["language"].choices)[1:] 
