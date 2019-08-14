import { Request, Response } from 'express';
import Pagos, { IPagos } from '../classes/interfaces/pagos.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get(
  '/pagos',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    Pagos.find({})
      .populate('movimiento')
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

// MOSTRAR PAGOS POR SERVICIO
app.get(
  '/pagos/servicio/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let servicio = req.params.id;

    Pagos.find({
      servicio
    })
      .populate('movimiento')
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
  '/pagos',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let pagos = new Pagos({
      movimiento: body.movimiento,
      servicio: body.servicio
    });

    pagos.save((err, data) => {
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

app.put(
  '/pagos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['movimiento', 'servicio']);

    Pagos.findByIdAndUpdate(
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
          data
        });
      }
    );
  }
);

app.delete(
  '/pagos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Pagos.find({ _id: id })
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
          data
        });
      });
  }
);

export default app;
