import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { from } from "rxjs/observable/from";
import { Subject, Observable } from "rxjs";

@Injectable()
export class ConfigService {
	private configSubject: Subject<any>;
	private configObservable: Observable<any>;

	constructor(private storage: Storage) {
		this.configSubject = new Subject();
		this.configObservable = this.configSubject.asObservable();
	}

	getConfig() {
		this.storage.get('config')
			.then(c => {
				let auxConfig = { host: null };
				if (!c) {
					this.storage.set('config', auxConfig);
				}
				else {
					auxConfig = c;
				}
				this.configSubject.next(auxConfig);
			});
		return this.configObservable;
	}

	setHost(host: string) {
		const config = { host: host };

		this.storage.set('config', config);
		this.configSubject.next(config);
	}
}
