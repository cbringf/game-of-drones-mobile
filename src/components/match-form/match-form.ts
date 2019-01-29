import { Component, Output, EventEmitter } from "@angular/core";
import { IMatch } from "../../api/models/match";
import { MatchRepo } from "../../api/repositories/match";
import { PlayerRepo } from "../../api/repositories/player";
import { IMatchFormResult } from "../../api/models/match-form-result";
import { ERROR_COLLECTOR_TOKEN } from "@angular/platform-browser-dynamic/src/compiler_factory";
import { Subscription } from "rxjs";

@Component({
	selector: 'match-form',
	templateUrl: './match-form.html'
})
export class MatchFormComponent {
	private match: IMatch;
	private name: string;
	private matchPatchedEvent: Subscription;
	private matchCreatedEvent: Subscription;
	@Output() onMatchResolved: EventEmitter<IMatchFormResult>;

	constructor(
		private matchRepo: MatchRepo,
		private playerRepo: PlayerRepo
	) {
		this.onMatchResolved = new EventEmitter();
		this.matchCreatedEvent = this.matchRepo.subscribe('created')
			.subscribe(m => this.match = m);
		this.matchPatchedEvent = this.matchRepo.subscribe('patched')
			.subscribe(m => this.match = m);
		matchRepo.findOpenMatch()
			.filter(m => !!m)
			.subscribe(m => {
				this.match = m;
				this.matchCreatedEvent.unsubscribe();
			});
	}

	get createButtonText() {
		return !this.match ? 'Create match' : 'Match available';
	}

	async createMatch() {
		let player = await this.playerRepo.findOrCreate(this.name).toPromise();

		this.matchCreatedEvent.unsubscribe();
		this.matchRepo.createMatch({ player1Id: player._id }).subscribe(m => {
			m.player1Id = player._id;
			this.onMatchResolved.emit({
				match: m,
				myPlayerField: 'player1Id',
				myPlayer: player
			});
		});
	}

	async joinMatch() {
		let player = await this.playerRepo.findOrCreate(this.name).toPromise();
		let matchField = ['_id'];

		if (!this.match.player1Id) {
			this.match.player1Id = player._id;
			matchField.push('player1Id');
		}
		else if (this.match.player1Id !== player._id) {
			this.match.player2Id = player._id;
			matchField.push('player2Id');
		}
		else {
			return;
		}
		this.matchRepo.patchMatch(this.match, matchField).subscribe(m => {
			this.matchPatchedEvent.unsubscribe();
			this.onMatchResolved.emit({
				match: this.match,
				myPlayerField: matchField[1],
				myPlayer: player
			});
		});
	}
}
