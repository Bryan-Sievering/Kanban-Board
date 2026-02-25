import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private _tasks = signal<Task[]>(this.loadFromStorage());
  readonly tasks = this._tasks.asReadonly();

  addTask(title: string, description: string){
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo'
    };

    this._tasks.update(current => [...current, newTask]);
    this.saveToStorage();
  }

  updateTaskStatus(taskId: string, newStatus: 'todo' | 'doing' | 'done') {
    this._tasks.update(current => current.map(t => t.id === taskId ? {...t, status: newStatus} : t));
    this.saveToStorage();
  }

  private saveToStorage(){
    localStorage.setItem('kanban-tasks', JSON.stringify(this.tasks()));
  }

  private loadFromStorage(): Task[]{
  const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      return JSON.parse(saved);
    }

    // If nothing is in storage, return these initial tasks
    return [
      { id: '1', title: 'Test Task 1', description: 'Desc 1', status: 'todo' },
      { id: '2', title: 'Test Task 2', description: 'Desc 2', status: 'doing' }
    ];
  }
}
