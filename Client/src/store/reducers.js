import { SET_ACCOUNT } from './actions_types'

export default function reducers(state = {}, action) {
    switch(action.type) {
        case SET_ACCOUNT :
            return { ...state, account: action.data }
        default : 
            return state;
    }
}
