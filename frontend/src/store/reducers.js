import { SET_ACCOUNT } from './actions_types'

// this reducer handles the account state when setting account
export default function reducers(state = {}, action) {
    switch(action.type) {
        case SET_ACCOUNT :
            return { ...state, account: action.data }
        default : 
            return state;
    }
}
