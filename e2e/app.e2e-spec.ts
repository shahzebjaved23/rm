import { RmPage } from './app.po';

describe('rm App', () => {
  let page: RmPage;

  beforeEach(() => {
    page = new RmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
