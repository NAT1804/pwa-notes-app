import { Component } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NoteService } from 'src/app/shared/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent {
  notes: Note[] = new Array<Note>();

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
  }

  deleteNode(id: number) {
    this.noteService.delete(id);
  }
}
