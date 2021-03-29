import * as sinon from "sinon";
import {Connection, ConnectionManager, Repository} from "typeorm/index";
import {CallInfoRepository} from "../../src/repositories/CallInfoRepository";
import {ICreateCallInfoDTO, ICalculateCallInfoDTO, IReturnPriceCallCalculatedDTO} from "../../src/dtos/CallInfoDTO";
import {CallInfo} from "../../src/entities/CallInfo";
import {CallInfoMock} from "../../src/utils/mocks/CallInfoMock";
import CallInfoService from "../../src/services/CallInfoService";

const returnDataMock: CallInfo = {
    id: 1,
    source: "011",
    destiny: "016",
    valueMinute: 1.90
}

const returnPlan60Mock: CallInfo = {
    id: 1,
    source: "011",
    destiny: "017",
    valueMinute: 1.70
}

const inputDataMock: ICreateCallInfoDTO = {
    source: "011",
    destiny: "016",
    valueMinute: 1.90
}

const faleMais30Mock: ICalculateCallInfoDTO = {
    source: "011",
    destiny: "016",
    plan: "FaleMais 30",
    timeCall: 20,
}

const faleMais60Mock: ICalculateCallInfoDTO = {
    source: "011",
    destiny: "017",
    plan: "FaleMais 60",
    timeCall: 80,
}

const returnFaleMais30Mock: IReturnPriceCallCalculatedDTO = {
    valueWithPlan: "0",
    valueWithoutPlan: "38",
}

const returnFaleMais60Mock: IReturnPriceCallCalculatedDTO = {
    valueWithPlan: "37.40",
    valueWithoutPlan: "136",
}

describe('testing #CallInfoService', ()=> {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should create callInfo', async () => {
        const callInfoService = new CallInfoService();
        sandbox.stub(CallInfoRepository.prototype, "create").resolves(returnDataMock);

        const response = await callInfoService.create(inputDataMock);

        expect(response).toBe(returnDataMock);
    })

    it('Should populate database', async () => {
        const callInfoService = new CallInfoService();
        sandbox.stub(CallInfoRepository.prototype, "save").resolves(CallInfoMock);
        sandbox.stub(CallInfoRepository.prototype, "findAll").resolves([]);

        const response = await callInfoService.populate();
        expect(response).toStrictEqual(CallInfoMock);
    });

    it('Should calculate with phone plan FaleMais 30', async () => {
        const callInfoService = new CallInfoService();
        sandbox.stub(CallInfoRepository.prototype, "findBySourceAndDestiny").resolves(returnDataMock);

        const response = await callInfoService.calculateCallPrice(faleMais30Mock);
        expect(response).toStrictEqual(returnFaleMais30Mock);
    });

    it('Should calculate with phone plan FaleMais 60', async () => {
        const callInfoService = new CallInfoService();
        sandbox.stub(CallInfoRepository.prototype, "findBySourceAndDestiny").resolves(returnPlan60Mock);

        const response = await callInfoService.calculateCallPrice(faleMais60Mock);
        expect(response).toStrictEqual(returnFaleMais60Mock);
    });

})
