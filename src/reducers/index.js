import {combineReducers} from 'redux'

import user from './user'
import global from './global'
import manager from './manager'

export default combineReducers({
    user,
    global,
    manager
})