declare module "json-api-reader" {
  export function readAsLookup<T>(data: Record<string, any>): T;
  export function readAsList<T>(data: Record<string, any>): T;
}
