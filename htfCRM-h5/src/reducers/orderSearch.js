/**
 * Created by xingzhe on 17/12/7.
 */
import {
    SAVE_ORDER_SEARCH
} from "../actions/actionTypes";

import reduxRoot from "../actions/reduxRoot";

const orderSearch = (state = reduxRoot.orderSearch, action, cb) => {
    switch (action.type) {
        case SAVE_ORDER_SEARCH:
        {
            state = Object.assign({}, state, action.params);
            cb && cb();
            return state;
        }
        default:
            return state;
    }
};

export default orderSearch