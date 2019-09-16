export class SorterConfig {
  title: string;
  key: string;
  values: Array<string>;

  constructor(title: string, key: string, values: Array<string>) {
    this.title = title;
    this.key = key;
    this.values = values;
  }
}
