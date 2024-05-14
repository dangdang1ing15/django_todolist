from django import forms

class TodoForm(forms.Form):
    text = forms.CharField(max_length=100, label='Todo', widget=forms.TextInput(attrs={'placeholder': 'Add todo item'}))