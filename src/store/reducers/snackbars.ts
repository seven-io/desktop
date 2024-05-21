export default (state: string[] = [], action: { type: string } & any) => {
    switch (action.type) {
        case 'ADD_SNACKBAR':
            return [
                ...state,
                action.message,
            ]

        case 'REMOVE_SNACKBAR':
            const newState = [...state]
            newState.splice(action.index, 1)

            return newState
        default:
            return state
    }
};
