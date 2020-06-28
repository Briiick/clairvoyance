import { SET_ACCOUNT } from './actions_types'
/*
 * action creators
 */

// updates account data to state
export function updateAccount(data) {
  return { type: SET_ACCOUNT, data }
}
