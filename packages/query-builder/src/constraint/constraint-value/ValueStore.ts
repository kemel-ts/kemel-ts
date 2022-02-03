export class ValueStore<T> {
  value: T;
  type: ValueType;

  constructor(value: T, type: ValueType) {
    this.value = value;
    this.type = type;
  }

  static column(value: string) {
    return new ValueStore(value, ValueType.Column);
  }

  static string(value: string) {
    return new ValueStore(value, ValueType.Column);
  }
}

export enum ValueType {
  Column = 'column',
  String = 'string'
}
