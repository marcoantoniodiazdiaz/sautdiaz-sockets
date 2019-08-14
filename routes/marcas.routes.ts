import { Request, Response } from 'express';
import Marcas, { IMarcas } from '../classes/interfaces/marcas.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get(
  '/marcas',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    Marcas.find({})
      .sort({
        nombre: 1
      })
      .exec((err, data) => {
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
  }
);

app.post(
  '/marcas',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let marcas = new Marcas({
      nombre: body.nombre
    });

    marcas.save((err, marcas) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        marcas
      });
    });
  }
);

app.put(
  '/marcas/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Marcas.findByIdAndUpdate(
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
          marcas: data
        });
      }
    );
  }
);

app.delete(
  '/marcas/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Marcas.find({ _id: id })
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
          marcas: data
        });
      });
  }
);

export default app;
