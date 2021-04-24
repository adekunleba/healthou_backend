import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

/// Base entity for all tables in the Database.
export abstract class TypeormEntityBase {
    constructor(props?: unknown) {
        if (props) {
            Object.assign(this, props)
        }
    }


    @PrimaryGeneratedColumn('increment')
    id!: number;

    @CreateDateColumn({
        type: "timestamp",
        update: false
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp",
    })
    updatedAt!: Date;
}