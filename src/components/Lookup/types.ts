import type {CNAMApiJsonResponse, Format, HLR, MNPApiJsonResponse} from '@seven.io/api'

export type LookupResponse =
    Format
    | HLR & { success?: never }
    | CNAMApiJsonResponse
    | MNPApiJsonResponse;
