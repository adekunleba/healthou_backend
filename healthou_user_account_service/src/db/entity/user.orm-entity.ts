import { createHash } from '../../helper/encryption';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { TypeormEntityBase } from './typeorm.entity.base';

/**
 * Base entity for User:
 * Extends Typeorm entity base therefore has id, created at and updated at
 */
@Entity('user')
export class UserEntity extends TypeormEntityBase {
    constructor(props?: UserEntity) {
        super(props);
    }

    /**
     * Username should be unique
     */
    @Column({ unique: true })
    username!: string;
    /**
     * User email should be unique
     */
    @Column({ unique: true })
    email!: string;

    @Column({ unique: true, type: 'longtext' })
    password!: string;

    @Column()
    passwordSalt!: string;

    @Column({type: 'boolean', default: false})
    userValidated!: boolean;

    @Column({ nullable: true})
    recoveryEmail!: string;

    /**TODO: Can auto detect country from IP address */
    @Column({nullable: true})
    country!: string;

    @Column({nullable: true})
    firstName!: string;

    @Column({nullable: true})
    lastName!: string;

    @Column({ nullable: true })
    middleName!: string;

    @Column({ nullable: true })
    phoneNumber!: number;

    @Column({ nullable: true })
    phoneNumberCode!: number;
    /**
     * Path to the address of the profile picture.
     */
    @Column({nullable: true})
    profilePicture!: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        let hashObj: { salt: string; hash: string } = await createHash(this.password, null);
        this.passwordSalt = hashObj.salt;
        this.password = hashObj.hash;
    }
}
