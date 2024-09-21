import { PeriodicElement } from "../Models/PeriodicElement";


export interface ElementState {
    elements: PeriodicElement[];
}

export const initialState: ElementState  = {
    elements: [
        ]
}
