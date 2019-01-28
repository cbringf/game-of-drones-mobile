import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators'
import { IPlayer } from '../models/player';
import { FeathersService } from '../services/feathers.service';
import { IService } from '../services/service.shape';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerRepo {
	playerService: IService;
	subscriptions: { [key: string]: Observable<IPlayer> };

	constructor(feathersService: FeathersService) {
		this.playerService = feathersService.getService('player');
		this.subscriptions = {};
	}

	getPlayer(id: string) {
		return this.playerService.get(id);
	}

	getAllPlayers() {
		return this.playerService.find({})
			.pipe(map((res: any) => res.data as IPlayer[]));
	}

	findOrCreate(name: string) {
		return this.playerService.find({
			query: {
				name: name
			}
		})
			.pipe(switchMap((res: any) => {
				if (res.total === 0) {
					return this.playerService.create({ name: name });
				}
				else {
					return of(res.data[0]);
				}
			}));
	}

	updatePlayer(player: IPlayer) {
		return this.playerService.patch(player._id, { record: player.record });
	}

	subscribe(event: string) {
		console.log('subscribing on player repo');
		if(!this.subscriptions[event]) {
			this.subscriptions[event] = this.playerService.on<IPlayer>(event);
		}
		return this.subscriptions[event];
	}
}
