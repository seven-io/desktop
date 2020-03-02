export default (state: any = [], action: any) => {
    switch (action.type) {
        case 'ADD_SNACKBAR':
            return [
                ...state,
                action.message,
            ];

        case 'REMOVE_SNACKBAR':
            state.splice(action.index, 1);

            return [...state];
        default:
            return state;
    }
};
