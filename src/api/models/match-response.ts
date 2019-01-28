import { IMatch } from './match';
import { IPlayer } from './player';

export interface IMatchResponse extends IMatch {
	player1: IPlayer;
	player2: IPlayer;
}
