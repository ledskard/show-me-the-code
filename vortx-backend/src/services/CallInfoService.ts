import { CallInfoRepository } from "../repositories/CallInfoRepository";
import { CallInfo } from "../entities/CallInfo";
import { ICalculateCallInfoDTO, ICreateCallInfoDTO, IReturnPriceCallCalculatedDTO } from "../dtos/CallInfoDTO";
import { CallInfoMock } from "../utils/mocks/CallInfoMock";
import {error} from "../utils/constants/ErrorConstants";

export default class CallInfoService {
    private readonly callInfoRepository: CallInfoRepository;

    constructor() {
        this.callInfoRepository = new CallInfoRepository();
    }

    public async create(data: ICreateCallInfoDTO): Promise<CallInfo> {
        const callInfo = await this.callInfoRepository.create(data);
        return callInfo;
    }

    public async populate(): Promise<CallInfo[]>{
        const existsCallInfo = await this.callInfoRepository.findAll();
        if(existsCallInfo.length === 0) {
            const callInfos = await this.callInfoRepository.save(CallInfoMock);
            return callInfos;
        }
        return existsCallInfo;
    }

    public async calculateCallPrice(data: ICalculateCallInfoDTO): Promise<IReturnPriceCallCalculatedDTO>{
        const plan = data.plan.split(" ");
        const callTimeFree = Number(plan[1]);

        let valueWithPlanFormated = "0";

        const callInfo = await this.callInfoRepository.findBySourceAndDestiny(data.source, data.destiny);

        if(!callInfo) throw { status: 404, message: error.call_cannot_be_completed };

        const valueWithoutPlan = callInfo.valueMinute * data.timeCall;
        if(data.timeCall > callTimeFree){
            const excededMinutes = callTimeFree - data.timeCall;
            const valueWithPlan = (callInfo.valueMinute * 1.10) * Math.abs(excededMinutes);
            valueWithPlanFormated = valueWithPlan.toFixed(2);
        }

        const valueCall: IReturnPriceCallCalculatedDTO = {
            valueWithoutPlan: valueWithoutPlan.toString(),
            valueWithPlan: valueWithPlanFormated
        }
        return valueCall;
    }
}
