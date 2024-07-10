import { FormValues } from "./Formvalues";

export interface ToDoProps {
  data?: FormValues[];
  loading: boolean;
  setLoading: (state: boolean) => void;
  getData: () => void;
}
