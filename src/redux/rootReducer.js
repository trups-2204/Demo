import { combineReducers } from 'redux';
import { reducer as customerListReducer} from './modules/customerList.module';

const rootReducer = combineReducers({
    ui: combineReducers({
        customer: customerListReducer,
    }),
});

export default rootReducer;