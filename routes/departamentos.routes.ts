import { Request, Response } from 'express';
import Departamentos, {
  IDepartamentos
} from '../classes/interfaces/departamentos.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/departamentos', verificaToken, (req: Request, res: Response) => {
  Departamentos.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      data
    });
  });
});

app.post(
  '/departamentos',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let departamentos = new Departamentos({
      nombre: body.nombre
    });

    departamentos.save((err, departamentos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        departamentos
      });
    });
  }
);

app.put(
  '/departamentos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Departamentos.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        res.json({
          ok: true,
          vehiculo: data
        });
      }
    );
  }
);

app.delete(
  '/departamentos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Departamentos.find({ _id: id })
      .remove()
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        res.json({
          ok: true,
          vehiculo: data
        });
      });
  }
);

export default app;
