import { AxiosError } from "axios";

export type IReactQueryError = AxiosError<{ error: string }>;