import React from "react";

interface Data {
  data: string;
}

interface Props {
  children: (data: Data) => React.ReactElement;
  props?: any;
}

export function Validate({ children }: Props) {
  return children({ data: "yo" });
}
