import {combineReducers} from 'redux'

import user from './user'
import global from './global'
import notice from'./notice'

export default combineReducers({
    user,
    global,
    notice
})