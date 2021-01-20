export type BaseInputProps<V, R> = {
    label: string
    handleChange(name: string, value: R): void
    stateKey: string
    value: V | undefined
}