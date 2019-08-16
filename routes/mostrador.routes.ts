import { Request, Response } from 'express';
import Mostrador, {
  IMostrador
} from '../classes/interfaces/mostrador.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/mostrador', verificaToken, (req, res) => {
  Mostrador.find({})
    .sort({
      fecha: -1
    })
    .populate({
      path: 'cliente'
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
});

app.get('/mostrador/:id', verificaToken, (req, res) => {
  let id = req.params.id;

  Mostrador.find({
    _id: id
  })
    .populate({
      path: 'cliente'
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
});

app.post(
  '/mostrador',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let mostrador = new Mostrador({
      fecha: new Date().toISOString()
    });

    mostrador.save((err, data) => {
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

app.delete(
  '/mostrador/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Mostrador.find({ _id: id })
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
