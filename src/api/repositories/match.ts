import { Observable, Subject } from 'rxjs';
import { IMatch } from '../models/match';
import { Injectable } from '@angular/core';
import { FeathersService } from '../../api/services/feathers.service';
import { map } from 'rxjs/operators';
import { IMatchResponse } from '../models/match-response';
import { IService } from '../services/service.shape';
import * as _ from 'lodash';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';
import { serviceFactory } from '../factories/service';

@Injectable()
export class MatchRepo {
	private matchService: IService;
	private subscriptions: {[key: string]: Observable<IMatch>};

	constructor(feathers: FeathersService) {
		this.matchService = feathers.getService('match');
		this.subscriptions = {};
	}

	getAllMatches() {
		return this.matchService.find({ query: { $limit: 100 } })
			.pipe(map((res: any) => res.data as IMatchResponse[]));
	}

	findOpenMatch() {
		return this.matchService.find({ query: { open: true } })
			.pipe(map((res: any) => res.data as IMatchResponse[]))
			.pipe(map(res => res.length > 0 ? res[0] : null));
	}

	findMatches(query: any) {
		return from(this.matchService.find({ query: query }))
			.pipe(map((res: any) => res.data as IMatchResponse[]));
	}

	createMatch(data: any = {}): Observable<IMatch> {
		console.log(data);
		return this.matchService.create(data);
	}

	updateMatch(match:IMatch) {
		return this.matchService.update(match._id, match);
	}

	patchMatch(match: IMatch, fields: string[]) {
		const data = _.pick(match, fields);
		console.log(match._id);
		console.log(data);
		return this.matchService.patch(match._id, data);
	}

	subscribe(event: string) {
		if(!this.subscriptions[event]) {
			this.subscriptions[event] = this.matchService.on<IMatch>(event);
		}
		return this.subscriptions[event];
	}
}
