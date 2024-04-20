from django.urls import path
from .views import TodoListCreateAPIView, TodoDetailAPIView

urlpatterns = [
    path('api/todos/', TodoListCreateAPIView.as_view(), name='todo-list-create'),
    path('api/todos/<int:pk>/', TodoDetailAPIView.as_view(), name='todo-detail'),
]
