import React from "react"
import { increment, identity } from "fp-ts/function"

import { ValidateWithoutTypeguard, makeValidateComponent } from "../Validate"
import { isRecord } from "../typeguards"

type Data<T> = {
  data: {
    result?: {
      executionResult?: {
        data?: Array<T>
        headerItems?: Array<T>
      }
    }
  }
}

type GoodData<T> = {
  data: {
    result: {
      executionResult: {
        data: Array<T>
        headerItems: Array<T>
      }
    }
  }
}

const isGoodData = (u: unknown): u is GoodData<number> => {
  return (
    isRecord(u) &&
    isRecord(u.data) &&
    isRecord(u?.data?.result) &&
    isRecord(u.data.result.executionResult) &&
    Array.isArray(u.data.result.executionResult.data) &&
    Array.isArray(u.data.result.executionResult.headerItems)
  )
}

const validateLengths = (u: unknown): boolean => {
  return isGoodData(u)
    ? u.data.result.executionResult.data.length > 2 &&
        u.data.result.executionResult.headerItems.length > 3
    : false
}

const goodDataBadLengths: Data<number> = {
  data: {
    result: {
      executionResult: {
        data: [10],
        headerItems: [1, 2, 3],
      },
    },
  },
}

const goodDataGoodLengths: Data<number> = {
  data: {
    result: {
      executionResult: {
        data: [10, 11, 12],
        headerItems: [1, 2, 3, 4, 5],
      },
    },
  },
}

const badData: Data<string> = {
  data: {
    result: {
      executionResult: {
        data: ["yo"],
      },
    },
  },
}

const Validate = makeValidateComponent(isGoodData)

const Div = ({ children }: { children: React.ReactChild }) => (
  <div style={{ marginBottom: "50px" }}>{children}</div>
)

export function App() {
  return (
    <>
      <Div>
        <>
          <span>Validation #1</span>
          <ValidateWithoutTypeguard
            validate={validateLengths}
            data={goodDataBadLengths}
            fallback={() => <p>Is correct type, fails validate function</p>}
          >
            {validated => (
              <p>
                {isRecord(validated) &&
                  validated.data.result.executionResult.data
                    .map(identity)
                    .toString()}
              </p>
            )}
          </ValidateWithoutTypeguard>
        </>
      </Div>
      <Div>
        <>
          <span>Validation #2</span>
          <Validate
            validate={validateLengths}
            data={goodDataGoodLengths}
            fallback={() => null}
          >
            {validated => (
              <p>
                {validated.data.result.executionResult.data
                  .map(increment)
                  .toString()}
              </p>
            )}
          </Validate>
        </>
      </Div>
      <Div>
        <>
          <span>Validation #3</span>
          <Validate
            validate={validateLengths}
            data={badData}
            fallback={() => <p>Fails validation</p>}
          >
            {validated => <p>{validated.data.result.executionResult.data}</p>}
          </Validate>
        </>
      </Div>
    </>
  )
}
