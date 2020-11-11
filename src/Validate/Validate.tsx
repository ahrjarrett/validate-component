import React from "react"
import { Predicate, identity } from "fp-ts/function"

import { isAny } from "../typeguards"

type Is<T> = (u: unknown) => u is T

interface Props<Input, Output> {
  children: (data: Output) => React.ReactElement
  data: Input
  validate: Predicate<Input>
  fallback: () => React.ReactNode | React.ReactElement
}

export const makeValidateComponent = <Output,>(is: Is<Output>) => <Input,>({
  data,
  validate,
  children,
  fallback,
}: Props<Input, Output>) => (
  <>{validate(data) && is(data) ? children(data as Output) : fallback()}</>
)

export const ValidateWithoutTypeguard = makeValidateComponent<unknown>(isAny)
