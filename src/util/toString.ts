export const toString = (v: any) => {
    return typeof v === 'object' ? JSON.stringify(v) : v;
};