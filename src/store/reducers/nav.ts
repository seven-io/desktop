export type Route = 'send' | 'options' | 'history' | 'docs' | 'contacts' | 'pricing' | 'lookup'

export default (state: Route = 'send', action: any) => {
    switch (action.type) {
        case 'SET_NAV':
            state = action.nav;

            return state;
        default:
            return state;
    }
};