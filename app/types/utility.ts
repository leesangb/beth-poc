type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type RouteWithMethod<T, M extends RouteMethod> = {
  [Path in keyof T]: M extends keyof T[Path] ? Path : never;
}[keyof T];

export type HtmxRoute<T extends string> = T extends `/htmx/${infer Right}`
    ? Right extends `${infer S}/`
      ? `/htmx/${S}`
      : T
    : never;

export type DynamicRoute<
  S extends string,
> = S extends `${infer Left}/:/${infer Right}`
  ? `${Left}/${string|number}/${DynamicRoute<Right>}`
  : S extends `${infer Left}/:${string}`
    ? `${Left}/${string|number}`
    : S;
