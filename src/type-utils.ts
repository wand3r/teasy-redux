export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> {}

export type DeepReadonlyObject<A> = {
  readonly [K in keyof A]: DeepReadonly<A[K]>
}

export type DeepReadonly<A> = A extends Array<infer B>
  ? DeepReadonlyArray<B>
  : A extends object
  ? DeepReadonlyObject<A>
  : A
