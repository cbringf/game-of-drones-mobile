import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IMatch } from '../../api/models/match';
import { IMatchFormResult } from '../../api/models/match-form-result';
import { IPlayer } from '../../api/models/player';
import { PlayerRepo } from '../../api/repositories/player';
import { MatchRepo } from '../../api/repositories/match';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	match: IMatch;
	myPlayerField: string;
	players: IPlayer[];
	private matchPatchedEvent: Subscription;
	private playerPatchedEvent: Subscription;

	constructor(
		public navCtrl: NavController,
		private playerRepo: PlayerRepo,
		private matchRepo: MatchRepo
	) {
		this.players = [];
	}

	get myPlayer() {
		return this.players
			.filter(p => p._id === this.match[this.myPlayerField])[0];
	}

	get otherPlayer() {
		return this.players
			.filter(p => p._id !== this.match[this.myPlayerField])[0];
	}

	get winner() {
		return this.match.finished && this.match.winner === this.players[0]._id;
	}

	async setMatch(matchFormResult: IMatchFormResult) {
		this.match = matchFormResult.match;
		this.myPlayerField = matchFormResult.myPlayerField;
		this.players.push(matchFormResult.myPlayer);

		if (!this.match.open) {
			const aux = this.match.player1Id === matchFormResult.myPlayer._id ?
				await this.playerRepo.getPlayer(this.match.player2Id).toPromise() :
				await this.playerRepo.getPlayer(this.match.player1Id).toPromise();
			this.players.push(aux);
		}
		this.playerPatchedEvent = this.playerRepo.subscribe('patched').subscribe(p => {
			let playerIndex = _.
				findIndex(this.players, localPlayer => p._id === localPlayer._id);
			this.players[playerIndex] = p;
		});
		this.matchPatchedEvent = this.matchRepo.subscribe('patched').subscribe(async m => {
			this.match = m;
			if(this.players.length < 2) {
				const playerId = this.myPlayerField === 'player1Id' ?
				this.match.player2Id : this.match.player1Id;
				this.players.push(await this.playerRepo.getPlayer(playerId).toPromise());
			}
		});
	}

	exit() {
		this.players = [];
		this.match = null;
		this.myPlayerField = '';
		this.playerPatchedEvent.unsubscribe();
		this.matchPatchedEvent.unsubscribe();
	}
}
