export type Route = 'sms' | 'options' | 'contacts' | 'pricing' | 'lookup' | 'voice'

export default (state: Route = 'sms', action: any) => {
    switch (action.type) {
        case 'SET_NAV':
            state = action.nav;

            return state;
        default:
            return state;
    }
};