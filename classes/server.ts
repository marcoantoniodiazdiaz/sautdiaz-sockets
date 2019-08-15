import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSockets();
    this.mongoConnect();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log('Escuchando conexiones!');

    this.io.on('connection', cliente => {
      // Conectar Cliente
      socket.conectarCliente(cliente);
      // Mensajes
      socket.mensaje(cliente, this.io);
      // Desconetar
      socket.desconectar(cliente);
      // Configurar Usuario
      socket.set_usuario(cliente, this.io);
    });
  }

  private mongoConnect() {
    mongoose.connect(
      'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true },
      (err: MongoError) => {
        if (err) throw err;
        console.log('ATLAS conectado.');
      }
    );
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback);
  }
}
