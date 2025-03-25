export type NavigationBaseProps = {
    index: number
    list: any[]
}

export type KeyValue<K = any, V = any> = {
    key: K
    value: V
}

export type Operator = '+' | '-'