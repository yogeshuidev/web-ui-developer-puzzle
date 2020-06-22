import { $, browser, ExpectedConditions, $$ } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to mark a book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const selectABookToAddReadingList = await $$('[data-testing="book-add-to-read"]');
    selectABookToAddReadingList[0].click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const booksInReadingList = await $$('[data-testing="book-finish"]');
    booksInReadingList[0].click();

    const booksInFinishedState = await $$('.reading-list-item--details--finished');
    expect(booksInFinishedState.length).to.be.equal(1);

    const btnClose = await $$('[data-testing="btn-close"]');
    btnClose[0].click();

    const selectedBooksFinished = await $$('[data-testing="book-finished"]');
    expect(selectedBooksFinished.length).to.be.equal(1)
    selectedBooksFinished[0].getText().then((value: string) => {
      expect(value).to.be.equal('Finished')
    })
  });

});
