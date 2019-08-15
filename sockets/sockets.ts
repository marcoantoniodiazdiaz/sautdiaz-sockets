import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuarios';

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
  cliente.on('mensaje', (payload: { from: string; body: string }, callback) => {
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
