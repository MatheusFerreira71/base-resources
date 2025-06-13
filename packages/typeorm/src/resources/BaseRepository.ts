import type { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import type { TBaseEntity } from "../types/entities.types";

export abstract class BaseRepository<
	T extends TBaseEntity,
	DTO extends DeepPartial<T> = DeepPartial<T>,
> {
	constructor(protected readonly repository: Repository<T>) {}

	public async findAll(): Promise<T[]> {
		return await this.repository.find();
	}

	public async findOne(id: T["id"]): Promise<T | null> {
		return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
	}

	public async create(data: DTO): Promise<T> {
		const entity = this.repository.create(data);
		return await this.repository.save(entity);
	}

	public async update(
		id: T["id"],
		data: QueryDeepPartialEntity<T>,
	): Promise<T | null> {
		await this.repository.update(id, data);
		return await this.findOne(id);
	}

	public async delete(id: T["id"]): Promise<void> {
		await this.repository.delete(id);
	}
}
