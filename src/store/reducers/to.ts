import {LocalStore} from '../../util/LocalStore';

export default (state: string = LocalStore.get('options.to') as string, action: any) => {
    switch (action.type) {
        case 'SET_TO':
            state = action.to;

            return state;
        default:
            return state;
    }
};