class Page {
  isOpen = false;

  constructor() {
    this.openPage();
  }

  printMenu() {
    console.clear();
  }
  openPage() {
    this.isOpen = true;
  }
  getOpen() {
    return this.isOpen;
  }
}

module.exports = Page;
