import { $, $$, browser, ExpectedConditions, element, by } from 'protractor';
import { expect, should } from 'chai';

describe('When: Use the search feature', () => {
  xit('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });

  it('Then: I should be able to undo adding a book from reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');

    const bookAddToRead = await $$('[data-testing="book-add-to-read"]');
    bookAddToRead[0].click();

    const readingList = await $('[data-testing="reading-list-count"]');
    readingList.getText().then(count => {
      expect(count).to.be.equal('1');
    });

    const snackBar = await $('.mat-simple-snackbar-action');
    snackBar.click();

    const undoReadingList = await $('[data-testing="reading-list-count"]') as Element;
    expect(undoReadingList.children).to.be.undefined;
  });

  it('Then: I should be able to undo removing a book from reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');

    const bookAddToRead = await $$('[data-testing="book-add-to-read"]');
    bookAddToRead[0].click();

    let readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    let booksInReadingList = await $$('.reading-list-item');
    expect(booksInReadingList.length).to.be.equal(1);

    const bookToRemoveFromReadingList = await $$('[data-testing="book-remove"]');
    bookToRemoveFromReadingList[0].click();

    browser.executeScript(`
        const button = document.querySelector('.mat-simple-snackbar-action button');
        button.click();`
    );

    await browser.get('/');

    readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const booksInReadingListUndo = await $$('.reading-list-item');
    expect(booksInReadingListUndo.length).to.be.equal(1);
  });

});
