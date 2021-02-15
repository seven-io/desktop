import {LocalStore} from '../../util/LocalStore';
import {IOptions} from '../../components/Options/types';
import {SetOptionsAction} from '../actions';

export default (state: IOptions = LocalStore.get('options'), action: SetOptionsAction) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            state = action.options;

            return state;
        default:
            return state;
    }
};