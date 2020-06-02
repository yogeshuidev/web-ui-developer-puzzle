import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  searchText: string;
  searchModelChanged: Subject<string> = new Subject<string>();
  books$: Observable<ReadingListBook[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books$ = this.store.pipe(select(getAllBooks));
    this.searchModelChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(newText => {
        if (newText) {
          this.store.dispatch(searchBooks({ term: newText }));
        } else {
          this.store.dispatch(clearSearch());
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.searchText = this.searchTerm;
    }
  }
}

