import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('informacao_da_chamada')
export class CallInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "origem" })
    source: string;

    @Column({ name: "destino" })
    destiny: string;

    @Column({ name: "valor_minutos", type: 'numeric' })
    valueMinute: number;

}
