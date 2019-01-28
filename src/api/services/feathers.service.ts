import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import * as feathers from '@feathersjs/feathers';
import * as socketio from '@feathersjs/socketio-client';
import { IService } from "./service.shape";
import { serviceFactory } from "../factories/service";
import { server } from "../config/enviroment";

@Injectable()
export class FeathersService {
	private client;

	constructor() {
		const socket = io(server);

		this.client = feathers();
		this.client.configure(socketio(socket));
	}

	getService(name: string) {
		return serviceFactory(this.client.service(name));
	}
}
