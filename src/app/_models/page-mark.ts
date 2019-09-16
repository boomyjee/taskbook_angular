export class PageMark {
  title: string;
  onAction: Function;
  isCurrent: boolean;

  constructor(title: string, onAction: Function, isCurrent: boolean) {
    this.title = title;
    this.onAction = onAction;
    this.isCurrent = isCurrent;
  }
}
