# Tasks
### Task 1: Code fixes and review
** Are there any web accessibility (a11y) issues in the app?
- Buttons must have discernible text
  ```javascript
    <button mat-icon-button matSuffix>
      <mat-icon>search</mat-icon>
    </button>
  ``` 
  - Elements must have sufficient color contrast
  ```javscript
   <p>
      Try searching for a topic, for example "<a (click)="searchExample()">JavaScript</a>".
  </p>
    ```
- Images must have alternate text
- Form elements must have labels
- All page content must be contained by landmarks
- ARIA hidden element must not contain focusable elements