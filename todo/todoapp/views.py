from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo
from .forms import TodoForm

def todo_list(request):
    todo_items = Todo.objects.all()
    form = TodoForm()

    if request.method == 'POST':
        if 'add_todo' in request.POST:
            form = TodoForm(request.POST)
            if form.is_valid():
                new_todo = Todo(title=form.cleaned_data['text'])
                new_todo.save()
                return redirect('todo_list')
        elif 'complete_todo' in request.POST:  # 완료 체크박스를 처리합니다.
            todo_id = request.POST['complete_todo']
            todo = get_object_or_404(Todo, id=todo_id)
            todo.completed = True
            todo.save()
            return redirect('todo_list')
        elif 'undo_todo' in request.POST:  # 완료 취소를 처리합니다.
            todo_id = request.POST['undo_todo']
            todo = get_object_or_404(Todo, id=todo_id)
            todo.completed = False
            todo.save()
            return redirect('todo_list')

    todo_items = Todo.objects.all()
    return render(request, 'todo/todo_list.html', {'todos': todo_items, 'form': form})
