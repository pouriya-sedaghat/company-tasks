import { useState } from "react";

export function useToggle<Type>(initialState: Type) {
  const [state, setState] = useState<Type | boolean>(initialState);

  function toggle() {
    setState(prev => !prev);
  }

  return [state, toggle, setState] as [
    typeof state,
    typeof toggle,
    typeof setState
  ];
}
