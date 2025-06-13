import type {
	IdentityEntity,
	IncrementEntity,
	RowIdEntity,
	UuidEntity,
} from "../index";

export type TBaseEntity =
	| IncrementEntity
	| UuidEntity
	| RowIdEntity
	| IdentityEntity;
