import { Request, Response } from 'express';
import Proveedores, {
  IProveedores
} from '../classes/interfaces/proveedores.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get(
  '/proveedores',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    Proveedores.find({}).exec((err, data) => {
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
  '/proveedores',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let proveedores = new Proveedores({
      nombre: body.nombre
    });

    proveedores.save((err, proveedores) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        proveedores
      });
    });
  }
);

app.put(
  '/proveedores/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Proveedores.findByIdAndUpdate(
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
          proveedores: data
        });
      }
    );
  }
);

app.delete(
  '/proveedores/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Proveedores.find({ _id: id })
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
          proveedores: data
        });
      });
  }
);

export default app;
