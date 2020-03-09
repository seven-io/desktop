export default (state: boolean = false, action: any) => {
    switch (action.type) {
        case 'SET_BACKDROP':
            state = action.backdrop;

            return state;
        default:
            return state;
    }
};