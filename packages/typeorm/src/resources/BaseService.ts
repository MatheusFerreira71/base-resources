import type { DeepPartial } from "typeorm";
import type { TBaseEntity } from "../types/entities.types";
import type { BaseRepository } from "./BaseRepository";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseService<
	T extends TBaseEntity,
	DTO extends DeepPartial<T> = DeepPartial<T>,
> {
	constructor(protected readonly repository: BaseRepository<T, DTO>) {}

	public async findAll(): Promise<T[]> {
		return await this.repository.findAll();
	}

	public async findOne(id: T["id"]): Promise<T | null> {
		return await this.repository.findOne(id);
	}

	public async create(data: DTO): Promise<T> {
		return await this.repository.create(data);
	}

	public async update(
		id: T["id"],
		data: QueryDeepPartialEntity<T>,
	): Promise<T | null> {
		return await this.repository.update(id, data);
	}

	public async delete(id: T["id"]): Promise<void> {
		await this.repository.delete(id);
	}
}
