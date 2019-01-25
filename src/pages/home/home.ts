import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	scanValue: string;

	constructor(
		public navCtrl: NavController, private qr: QRScanner
	) {
	}

	scan() {
		this.qr.prepare()
			.then((status: QRScannerStatus) => {
				if (status.authorized) {
					let scanSub = this.qr.scan().subscribe((text: string) => {
						this.scanValue = text;
						alert(text);
						this.qr.hide();
						scanSub.unsubscribe();
					});
				}
			});
	}
}
