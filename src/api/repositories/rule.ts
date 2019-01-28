import { Injectable } from "@angular/core";
import { FeathersService } from "../services/feathers.service";
import { IService } from "../services/service.shape";
import { from } from "rxjs/observable/from";
import { map } from "rxjs/operators";
import * as _ from 'lodash';

@Injectable()
export class RuleRepo {
	private ruleService: IService;

	constructor(feathers: FeathersService) {
		this.ruleService = feathers.getService('rule');
	}

	getMoves() {
		return from(this.ruleService.find({}))
			.pipe(map((res: any) => {
				let aux = _.map(res.data, r => r.move);

				return _.uniq(aux);
			}));
	}
}
