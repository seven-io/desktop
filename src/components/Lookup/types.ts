import {CNAMApiJsonResponse, Format, HLR, MNPApiJsonResponse} from 'sms77-client';

export type LookupResponse = Format | HLR & { success?: never } | CNAMApiJsonResponse | MNPApiJsonResponse;