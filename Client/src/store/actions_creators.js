import { SET_ACCOUNT } from './actions_types'
/*
 * action creators
 */

export function updateAccount(data) {
  return { type: SET_ACCOUNT, data }
}
