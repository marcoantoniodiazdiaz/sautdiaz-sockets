import { Router, Request, Response } from 'express';
import * as clientes from './clientes.routes';

const app = Router();

export { app };

app.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!'
  });
});

app.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  res.json({
    ok: true,
    cuerpo,
    de
  });
});

app.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

export default app;
