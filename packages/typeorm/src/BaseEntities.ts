import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

abstract class BaseEntity {
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}

export abstract class IncrementEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;
}

export abstract class UuidEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;
}

export abstract class RowIdEntity extends BaseEntity {
	@PrimaryGeneratedColumn("rowid")
	id!: number;
}

export abstract class IdentityEntity extends BaseEntity {
	@PrimaryGeneratedColumn("identity")
	id!: number;
}
