export interface ICreateCallInfoDTO {
    source: string,
    destiny: string,
    valueMinute: number,
}

export interface ICalculateCallInfoDTO {
    source: string,
    destiny: string,
    plan: string,
    timeCall: number,
}

export interface IReturnPriceCallCalculatedDTO {
    valueWithPlan: string,
    valueWithoutPlan: string,
}