import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly loading: Locator;
  readonly table: {
    root: Locator;
    header: (col: string) => Locator;
    cell: (col: string, id: number) => Locator;
  };
  readonly errorModal: {
    overlay: Locator;
    message: Locator;
    closeButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.loading = page.getByTestId("loading-spinner");

    this.table = {
      root: page.getByTestId("user-table"),
      header: (col: string) => page.getByTestId(`header-${col.toLowerCase()}`),
      cell: (col: string, id: number) => page.getByTestId(`${col}-${id}`),
    };
    this.errorModal = {
      overlay: page.getByTestId("error-modal-overlay"),
      message: page.getByTestId("error-message"),
      closeButton: page.getByTestId("error-close-button"),
    };
  }
}
