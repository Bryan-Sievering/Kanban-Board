import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanService } from './services/kanban.service';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private kanbanService = inject(KanbanService);
  tasks = this.kanbanService.tasks;

  addNewTask(title: string, description: string) {
    if (title.trim()) {
      this.kanbanService.addTask(title, description);
    }
  }

  drop(event: CdkDragDrop<any>){
    const taskId = event.item.data.id;
    const newStatus = event.container.data as 'todo' | 'doing' | 'done';
    this.kanbanService.updateTaskStatus(taskId, newStatus);
  }
}
