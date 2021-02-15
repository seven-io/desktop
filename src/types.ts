export type NavigationBaseProps = {
    index: number
    list: any[]
}

export type BaseInputProps<S> = {
    label: string
    setState(state: S): void
    shrink?: boolean
    state: S
    stateKey: keyof S
}

export type KeyValue<K = any, V = any> = {
    key: K
    value: V
}

export type Operator = '+' | '-'