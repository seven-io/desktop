export const toString = (v: any) => 'object' === typeof v ? JSON.stringify(v) : v;