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

	public async findOne(id: T["id"]): Promise<T> {
		const payload = await this.repository.findOne(id);

		if (!payload) {
			throw new Error(`Entity with id ${id} not found`);
		}

		return payload;
	}

	public async create(data: DTO): Promise<T> {
		return await this.repository.create(data);
	}

	public async update(
		id: T["id"],
		data: QueryDeepPartialEntity<T>,
	): Promise<T> {
		const updatedEntity = await this.repository.update(id, data);

		if (!updatedEntity) {
			throw new Error(`Entity with id ${id} not found`);
		}

		return updatedEntity;
	}

	public async delete(id: T["id"]): Promise<void> {
		await this.repository.delete(id);
	}
}
