export type BaseInputProps<S> = {
    label: string
    setState(state: S): void
    state: S
    stateKey: keyof S
}

export type KeyValue<K = any, V = any> = {
    key: K
    value: V
}