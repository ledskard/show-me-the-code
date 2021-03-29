import * as sinon from "sinon";
import * as request from "supertest";
import app from "../../src/app";
import { ConnectionManager, Repository, Connection } from "typeorm";
import CallInfoService from "../../src/services/CallInfoService";
import { ICalculateCallInfoDTO, ICreateCallInfoDTO, IReturnPriceCallCalculatedDTO } from "../../src/dtos/CallInfoDTO";
import { CallInfo } from "../../src/entities/CallInfo";



const returnDataMock: CallInfo = {
    id: 1,
    source: "011",
    destiny: "016",
    valueMinute: 1.90
}

const inputDataMock: ICreateCallInfoDTO = {
    source: "011",
    destiny: "016",
    valueMinute: 1.90
}

const inputCalculateDataMock: ICalculateCallInfoDTO = {
    source: "011",
    destiny: "016",
    plan: "FalaMais 30",
    timeCall: 20,
}

const returnCalculateDataMock: IReturnPriceCallCalculatedDTO = {
    valueWithPlan: "0",
    valueWithoutPlan: "38",
}

describe("Testing #CallInfoController", () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
    });

    afterEach(() => {
        sandbox.restore();
    });

    test("Method create must return status 200", async (done) => {
        sandbox.stub(CallInfoService.prototype, "create").resolves(returnDataMock);

        const result = await request(app).post("/call/info/").send(inputDataMock);
        expect(result.status).toBe(200);
        done();
    });

    test("Method create must return status 422", async (done) => {
        sandbox.stub(CallInfoService.prototype, "create").resolves(returnDataMock);

        const result = await request(app).post("/call/info/");
        expect(result.status).toBe(422);
        done();
    });

    test("Method populate must return status 200", async (done) => {
        sandbox.stub(CallInfoService.prototype, "populate").resolves([returnDataMock]);

        const result = await request(app).post("/call/info/populate");
        expect(result.status).toBe(200);
        done();
    });


    test("Method calculateCallPrice must return status 200", async (done) => {
        sandbox.stub(CallInfoService.prototype, "calculateCallPrice").resolves(returnCalculateDataMock);

        const result = await request(app).post("/call/info/calculate").send(inputCalculateDataMock);
        expect(result.status).toBe(200);
        done();
    });

});
