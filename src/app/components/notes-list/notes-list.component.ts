import {
  style,
  transition,
  trigger,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NoteService } from 'src/app/shared/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // ENTRY ANIMATION
      transition('void => *', [
        // Initial State
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          // We have to 'expand' out the padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        // We first want
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(200),
      ]),

      transition('* => void', [
        // First scale
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        // then scale down back to normal size while beginning to fade out
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        // scale down and fade out
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        // When animate the spacing (which includes height, margin and padding)
        animate(
          '150ms ease-out',
          style({
            height: 0,
            'margin-bottom': 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  @ViewChild('filterInput') filterInputEl!: ElementRef<HTMLInputElement>;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
    this.filter("");
  }

  generateNoteUrl(note: Note) {
    let noteId = this.noteService.getId(note)
    return `${note.title.toLowerCase().trim().split(" ").join("-")}-${noteId}`
  }

  deleteNode(note: Note) {
    let noteId = this.noteService.getId(note)
    this.noteService.delete(noteId);
    this.filter(this.filterInputEl.nativeElement.value);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicate(terms); // remove duplicate value
    terms.forEach((word) => {
      allResults.push(...this.relevantNotes(word));
    });
    this.filteredNotes = this.removeDuplicate(allResults);

    // sort by relevancy
    this.sortByRelevancy(allResults);
  }

  removeDuplicate(arr: Array<any>): Array<any> {
    let uniqueRes: Set<any> = new Set<any>();

    arr.forEach((item) => {
      uniqueRes.add(item);
    });

    return Array.from(uniqueRes);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(
      (note) =>
        (note.body && note.body.toLowerCase().includes(query)) ||
        (note.title && note.title.toLowerCase().includes(query))
    );

    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    console.log(searchResults);
    //  This method will calculate the relevancy of a note based on the number of times it appear in the search result
    let noteCountObj: any = {}; // format NoteId:number

    searchResults.forEach((note) => {
      let noteId = this.noteService.getId(note);
      noteCountObj[noteId] = (noteCountObj[noteId] || 0) + 1;
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.noteService.getId(a);
      let bId = this.noteService.getId(b);
      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];
      return bCount - aCount;
    });
  }
}
