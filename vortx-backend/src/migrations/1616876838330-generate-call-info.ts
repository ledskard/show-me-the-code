import {MigrationInterface, QueryRunner} from "typeorm";

export class generateCallInfo1616876838330 implements MigrationInterface {
    name = 'generateCallInfo1616876838330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "informacao_da_chamada" ("id" SERIAL NOT NULL, "origem" character varying NOT NULL, "destino" character varying NOT NULL, "valor_minutos" numeric NOT NULL, CONSTRAINT "PK_31dde992b7f463f9477ae88b12d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "informacao_da_chamada"`);
    }

}
