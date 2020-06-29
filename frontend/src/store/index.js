import { createStore } from 'redux';
import reducers from './reducers'

// creates store for redux with reducer from reducers.js
const store = createStore(reducers, {
    account: null
})

// Debugging
// store.subscribe(() => {
//     console.log(store.getState());
// });

export default store;