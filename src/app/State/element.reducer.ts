import { createReducer, on } from "@ngrx/store";
import { initialState } from "./element.state";
import { insert, update } from "./element.action";

const _elementReducer = createReducer(initialState, 
  on(update, (state, { element }) => {
      const updatedElementData = state.elements.map((el) => 
          el.position == element.position ? { ...el, ...element } : el
        );
  
        return {
          ...state,
          elements: updatedElementData // zaktualizowana tablica z nowym elementem
        };
    }),
    on(insert, (state, { elements }) => {
          return {
            ...state,
            elements: [...elements]
          };
      })
) ;


export function elementReducer(state: any, action: any){
    return _elementReducer(state, action);
}