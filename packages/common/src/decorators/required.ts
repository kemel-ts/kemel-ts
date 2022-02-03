import "reflect-metadata";

export const requiredMetadataKey = Symbol("required");

export function required(isRequired: boolean = true) {
  return Reflect.metadata(requiredMetadataKey, isRequired);
}

export function isRequired(target: any, propertyKey: string): boolean {
  return Reflect.hasMetadata(requiredMetadataKey, target, propertyKey) &&
    Reflect.getMetadata(requiredMetadataKey, target, propertyKey);
}
