import {BaseThunkType, InferActionsTypes} from './store'
import {getAllCurrencies} from './currencies-reducer'
import * as actionType from './actionTypes'

let initialState = {
    initialized: true as boolean,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionType.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: false
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: actionType.INITIALIZED_SUCCESS} as const),
}

export const initializeApp = () => async (dispatch: any) => {
    const notesPromise = dispatch(getAllCurrencies())

    Promise.all([notesPromise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default appReducer