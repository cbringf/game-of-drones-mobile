import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeathersService } from '../api/services/feathers.service';
import { MatchFormComponent } from '../components/match-form/match-form';
import { MatchRepo } from '../api/repositories/match';
import { MatchBoardComponent } from '../components/match-board/match-board';
import { PlayerRepo } from '../api/repositories/player';
import { RuleRepo } from '../api/repositories/rule';
import { MatchFinishedComponent } from '../components/match-finished/match-finished';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		TabsPage,
		MatchFormComponent,
		MatchBoardComponent,
		MatchFinishedComponent
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		TabsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		FeathersService,
		MatchRepo,
		PlayerRepo,
		RuleRepo
	]
})
export class AppModule { }
