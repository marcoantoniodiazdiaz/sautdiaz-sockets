import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

// Declaracion de rutas
import router from './routes/router';
import clientes from './routes/clientes.routes';
import inventarios from './routes/inventarios.routes';
import departamentos from './routes/departamentos.routes';
import contabilidad from './routes/contabilidad.routes';
import login from './routes/login.routes';
import marcas from './routes/marcas.routes';
import mostrador from './routes/mostrador.routes';
import movimientos from './routes/movimientos.routes';
import pagos from './routes/pagos.routes';
import productos from './routes/productos.routes';
import proveedores from './routes/proveedores.routes';
import servicios from './routes/servicios.routes';
import trabajadores from './routes/trabajadores.routes';
import vehiculos from './routes/vehiculos.routes';
import ventaMostrador from './routes/venta-mostrador.routes';
import venta from './routes/ventas.routes';

const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use('/', router);
server.app.use('/', clientes);
server.app.use('/', departamentos);
server.app.use('/', login);
server.app.use('/', inventarios);
server.app.use('/', contabilidad);
server.app.use('/', marcas);
server.app.use('/', mostrador);
server.app.use('/', movimientos);
server.app.use('/', pagos);
server.app.use('/', productos);
server.app.use('/', proveedores);
server.app.use('/', servicios);
server.app.use('/', trabajadores);
server.app.use('/', vehiculos);
server.app.use('/', ventaMostrador);
server.app.use('/', venta);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
