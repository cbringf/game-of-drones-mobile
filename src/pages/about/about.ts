import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../api/services/config.service';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	host: string;
	config: any = {};

	constructor(
		public navCtrl: NavController,
		private configService: ConfigService) {
			this.configService.getConfig().subscribe(c => this.config = c);
	}

	setHost(host: string) {
		this.configService.setHost(host);
	}
}
