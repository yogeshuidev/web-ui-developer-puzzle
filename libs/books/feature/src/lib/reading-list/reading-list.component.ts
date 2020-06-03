import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList, getBooksById } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar("Book removed from reading list", "Undo", item)
  }

  openSnackBar(message: string, action: string, book: ReadingListItem) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.pipe(select(getBooksById(book.bookId))).subscribe(book =>
        this.store.dispatch(addToReadingList({ book }))
      )
    });
  }
}
