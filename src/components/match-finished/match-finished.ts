import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: 'match-finished',
	templateUrl: './match-finished.html'
})
export class MatchFinishedComponent {
	@Input() winner: boolean;
	@Output() onContinue: EventEmitter<{}>;

	constructor() {
		this.onContinue = new EventEmitter();
	}

	get text() {
		return this.winner ? 'You win!!!!' : 'You loose';
	}

	continue() {
		console.log('continue');
		this.onContinue.emit({});
	}
}
