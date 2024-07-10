import { useState } from "react";

export function useFilter<Type extends string[]>(initialState: Type) {
  const [state, setState] = useState<Type | string[]>(initialState);

  function filterHandler(fItem: string) {
    const exsitingFilter = state.find((item) => item === fItem);

    exsitingFilter
      ? setState((prev) => prev.filter((item) => item !== fItem))
      : setState((prev) => [...prev, fItem]);
  }

  return [state, filterHandler, setState] as [
    typeof state,
    typeof filterHandler,
    typeof setState
  ];
}
