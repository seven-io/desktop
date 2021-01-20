export type BaseInputProps<S> = {
    label: string
    setState(state: S): void
    state: S
    stateKey: keyof S
}