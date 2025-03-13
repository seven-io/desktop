import type {CnamResponse, Format, HLR, MnpResponse, RcsCapabilities} from '@seven.io/client'

export type LookupResponse =
    Format[]
    | HLR[] // (HLR & { success?: never })[]
    | CnamResponse[]
    | MnpResponse[]
    | RcsCapabilities[]
