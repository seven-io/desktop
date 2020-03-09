export type Route = 'send' | 'options' | 'contacts' | 'pricing' | 'lookup'

export default (state: Route = 'send', action: any) => {
    switch (action.type) {
        case 'SET_NAV':
            state = action.nav;

            return state;
        default:
            return state;
    }
};