import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuarios';
import Servicios, {
  IServicios
} from '../classes/interfaces/servicios.interface';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.add(usuario);
};

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');

    usuariosConectados.deleteUser(cliente.id);
  });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: any, callback) => {
    let mensaje = {
      from: payload['from'],
      body: payload['body'],
      date: payload['date']
    };

    const servicio = payload['servicio'];

    Servicios.findByIdAndUpdate(
      servicio,
      {
        $push: {
          chat: mensaje
        }
      },
      { new: true, runValidators: true },
      (err, data) => {
        if (err) {
          return;
        }
      }
    );

    io.emit('newMessages', payload);
  });
};

export const set_usuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('set_user', (payload: any, callback: Function) => {
    usuariosConectados.updateName(cliente.id, payload['nombre']);

    callback({
      ok: true,
      message: `${payload.nombre} ha iniciado sesión en sockets`
    });
  });
};
