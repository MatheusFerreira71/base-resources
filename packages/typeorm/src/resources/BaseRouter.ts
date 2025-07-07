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
		this.router.use(this.prefix);

		this.router.get("/", this.controller.findAll);
		this.router.get("/:id", this.controller.findOne);
		this.router.post("/", this.controller.create);
		this.router.put("/", this.controller.update);
		this.router.delete("/:id", this.controller.delete);
	}
}
