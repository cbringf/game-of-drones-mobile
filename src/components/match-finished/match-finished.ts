import {
	Component, Input,
	Output, EventEmitter
} from "@angular/core";
import { winText, looseText } from "./config";

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
		return this.winner ? winText : looseText;
	}

	continue() {
		this.onContinue.emit({});
	}
}
