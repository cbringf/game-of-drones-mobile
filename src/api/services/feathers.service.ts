import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import * as feathers from '@feathersjs/feathers';
import * as socketio from '@feathersjs/socketio-client';
import { IService } from "./service.shape";
import { serviceFactory } from "../factories/service";

@Injectable()
export class FeathersService {
	private client;

	constructor() {
		const socket = io('http://localhost:3030');

		this.client = feathers();
		this.client.configure(socketio(socket));
	}

	getService(name: string) {
		return serviceFactory(this.client.service(name));
	}
}
