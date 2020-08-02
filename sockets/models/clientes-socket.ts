import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { ICliente } from '../../classes/interfaces/cliente.interface';

export class ClientesSocketController {

    // Emitir inserción de cliente
    newClient = (io: socketIO.Server) => {
        let payload = {
            ok: true,
        }
        io.emit("newClient", payload);
    };

    hola() {

    }
}