export const toString = (v: any): any => {
    return typeof v === 'object' ? JSON.stringify(v) : v;
};
