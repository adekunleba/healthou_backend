import { Column, Entity, ValueTransformer } from 'typeorm';
import { TypeormEntityBase } from './typeorm.entity.base';


export const bigint: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): bigint => BigInt(parseInt(databaseValue, 10))
}

@Entity('token')
export class TokenEntity extends TypeormEntityBase {
    constructor(props?: TokenEntity) {
        super(props);
    }

    @Column()
    tokenType!: string;

    @Column()
    emailToken!: string;

    @Column({ type: 'boolean' })
    valid!: boolean;

    @Column({ type: 'timestamp', nullable: false})
    expiration!: Date;

    @Column({ nullable: false })
    userId!: string;
}
