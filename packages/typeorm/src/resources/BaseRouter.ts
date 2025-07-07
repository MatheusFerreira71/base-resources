import type { DeepPartial } from "typeorm";
import type { TBaseEntity } from "../types/entities.types";
import type { BaseController } from "./BaseController";
import type { Router } from "express";

export abstract class BaseRouter<
	T extends TBaseEntity,
	DTO extends DeepPartial<T> = DeepPartial<T>,
> {
	public router: Router;

	constructor(
		protected readonly controller: BaseController<T, DTO>,
		protected readonly prefix: string,
		router: Router,
	) {
		this.router = router;

		this.router.get(`${prefix}/`, this.controller.findAll);
		this.router.get(`${prefix}/:id`, this.controller.findOne);
		this.router.post(`${prefix}/`, this.controller.create);
		this.router.put(`${prefix}/`, this.controller.update);
		this.router.delete(`${prefix}/:id`, this.controller.delete);
	}
}
