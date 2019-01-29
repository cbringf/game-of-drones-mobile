import { Component, Input } from "@angular/core";
import { RuleRepo } from "../../api/repositories/rule";
import { Observable } from "rxjs";
import { IMatch } from "../../api/models/match";
import { IPlayer } from "../../api/models/player";
import { MatchRepo } from "../../api/repositories/match";

@Component({
	selector: 'match-board',
	templateUrl: './match-board.html'
})
export class MatchBoardComponent {
	moves: Observable<string>;
	@Input() myPlayer: IPlayer;
	@Input() otherPlayer: IPlayer;
	@Input() match: IMatch;

	constructor(
		ruleRepo: RuleRepo,
		private matchRepo: MatchRepo) {
		this.moves = ruleRepo.getMoves();
	}

	get onTurn() {
		return this.myPlayer._id === this.match.onTurn;
	}

	get isOnPlay() {
		return !this.match.open && !this.match.finished;
	}

	play(move: string) {
		if(this.match.onTurn === this.match.player1Id) {
			this.match.moves.player1.push(move);
		}
		else {
			this.match.moves.player2.push(move);
		}
		this.matchRepo.patchMatch(this.match, ['_id', 'moves']);
	}
}
