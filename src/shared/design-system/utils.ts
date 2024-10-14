export type TVariantMap<
  Variant extends string,
  D = undefined,
  N = undefined
> = D extends string
  ? Record<
      Variant,
      {
        base: string
      } & (N extends string
        ? Record<N, Record<D, string>>
        : {
            dynamic?: Record<D, string>
          })
    >
  : Record<Variant, string>
