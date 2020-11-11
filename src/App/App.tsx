import React from "react"

import { Validate } from "../Validate"

export function App() {
  return <Validate>{({ data }) => <p>{data}</p>}</Validate>
}
