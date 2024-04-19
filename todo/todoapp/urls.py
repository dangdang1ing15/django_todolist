from django.urls import path
from .views import TodoListCreateAPIView, todo_list

urlpatterns = [
    path('', todo_list, name='todo_list'),
    path('api/todos/', TodoListCreateAPIView.as_view(), name='api-todos'),
]
