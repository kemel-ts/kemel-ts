export interface ColumnSchema{
    getName(): string;
    getType(): string;
    getMaxLength(): number;
    isRequired(): boolean;
}
