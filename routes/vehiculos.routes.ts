import { Request, Response } from 'express';
import Vehiculos, {
  IVehiculos
} from '../classes/interfaces/vehiculos.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/vehiculos', verificaToken, (req: Request, res: Response) => {
  Vehiculos.find({})
    .populate('cliente')
    .populate('marca')
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

app.get(
  '/vehiculos/cliente/:cliente',
  verificaToken,
  (req: Request, res: Response) => {
    let cliente = req.params.cliente;

    Vehiculos.find({
      cliente
    })
      .populate('cliente')
      .populate('marca')
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
  '/vehiculos',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let vehiculos = new Vehiculos({
      placa: body.placa,
      marca: body.marca,
      submarca: body.submarca,
      color: body.color,
      modelo: body.modelo,
      cliente: body.cliente,
      motor: body.motor
    });

    vehiculos.save((err, vehiculos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        vehiculos
      });
    });
  }
);

app.put(
  '/vehiculos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
      'placa',
      'marca',
      'submarca',
      'color',
      'modelo',
      'cliente',
      'motor'
    ]);

    Vehiculos.findByIdAndUpdate(
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
  '/vehiculos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Vehiculos.find({ _id: id })
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
