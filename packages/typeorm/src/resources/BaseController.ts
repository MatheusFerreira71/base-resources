import type { DeepPartial } from "typeorm";
import type { TBaseEntity } from "../types/entities.types";
import type { BaseService } from "./BaseService";
import type { Request, RequestHandler, Response } from "express";

export abstract class BaseController<
	T extends TBaseEntity,
	DTO extends DeepPartial<T> = DeepPartial<T>,
> {
	constructor(protected readonly service: BaseService<T, DTO>) {}

	public findAll: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		console.log(req.url);

		const payload = await this.service.findAll();

		res.status(200).json(payload);
	};

	public findOne: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { id } = req.params;

		const payload = await this.service.findOne(id);

		res.status(200).json(payload);
	};

	public create: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const data: DTO = req.body;

		const payload = await this.service.create(data);

		res.status(201).json(payload);
	};

	public update: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { id, ...data } = req.body;

		const payload = await this.service.update(id, data);

		res.status(200).json(payload);
	};

	public delete: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { id } = req.params;

		await this.service.delete(id);
		res.status(204).send();
	};
}
