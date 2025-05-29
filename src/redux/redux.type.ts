import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { type RootState } from "./index";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;