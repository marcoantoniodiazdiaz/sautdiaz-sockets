import { Request, Response } from 'express';
import Trabajadores, {
  ITrabajadores
} from '../classes/interfaces/trabajadores.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/trabajadores', verificaToken, (req: Request, res: Response) => {
  Trabajadores.find({}).exec((err, data) => {
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
  '/trabajadores',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let trabajadores = new Trabajadores({
      nombre: body.nombre
    });

    trabajadores.save((err, trabajadores) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        trabajadores
      });
    });
  }
);

app.put(
  '/trabajadores/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Trabajadores.findByIdAndUpdate(
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
          trabajador: data
        });
      }
    );
  }
);

app.delete(
  '/trabajadores/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Trabajadores.find({ _id: id })
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
          trabajador: data
        });
      });
  }
);

export default app;
