import { IMatch } from "./match";
import { IPlayer } from "./player";

export interface IMatchFormResult {
	match: IMatch;
	myPlayerField: string;
	myPlayer: IPlayer
}
