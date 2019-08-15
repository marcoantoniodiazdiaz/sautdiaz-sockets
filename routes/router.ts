import { Router, Request, Response } from 'express';
import * as clientes from './clientes.routes';
import Server from '../classes/server';

const app = Router();

export { app };

app.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!'
  });
});

app.post('/mensajes', (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;

  const server = Server.instance;

  const payload = {
    from,
    body
  };

  server.io.emit('newMessages', payload);

  res.json({
    ok: true,
    body,
    from
  });
});

app.post('/mensajes/:id', (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;

  const server = Server.instance;

  const payload = {
    from,
    body
  };

  server.io.in(id).emit('private-message', payload);

  res.json({
    ok: true,
    body,
    from,
    id
  });
});

export default app;
