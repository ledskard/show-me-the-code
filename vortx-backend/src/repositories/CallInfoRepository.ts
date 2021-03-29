import { Repository, getRepository } from "typeorm";
import { CallInfo } from "../entities/CallInfo";
import { ICreateCallInfoDTO } from "../dtos/CallInfoDTO";

export class CallInfoRepository {
    private readonly callInfoRepository: Repository<CallInfo>;

    constructor() {
        this.callInfoRepository = getRepository(CallInfo);
    }

    public async create(data: ICreateCallInfoDTO): Promise<CallInfo> {
        const callInfo = await this.callInfoRepository.create(data);
        await this.callInfoRepository.save(callInfo);
        return callInfo;
    }

    public async save(data: CallInfo[]): Promise<CallInfo[]> {
        return await this.callInfoRepository.save(data);
    }

    public async findAll(): Promise<CallInfo[]> {
        const callInfo = await this.callInfoRepository.find();
        return callInfo;
    }

    public async findBySourceAndDestiny(source: string, destiny: string): Promise<CallInfo | undefined> {
        const callInfo = await this.callInfoRepository.findOne({ source, destiny });
        return callInfo;
    }
}
