import Component from '@glimmer/component';

interface TableArgs {
  headers: string[];
  rows: any[];
}

export default class Table extends Component<TableArgs> {
  get getHeaders() {
    return this.args.headers;
  }

  get getRows() {
    return this.args.rows;
  }
}
