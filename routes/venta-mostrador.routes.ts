import { Request, Response } from 'express';
import VentaMostrador, {
  IVentaMostrador
} from '../classes/interfaces/venta-mostrador.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';
app.get(
  '/ventas-mostrador',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    VentaMostrador.find({})
      .populate({
        path: 'producto'
      })
      .populate('servicio')
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

app.get(
  '/ventas-mostrador/venta/:venta',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let venta = req.params.venta;

    VentaMostrador.find({
      venta: venta
    })
      .populate('producto')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        let total = 0;
        let totalCompra = 0;

        for (let i = 0; i < data.length; i++) {
          total += +data[i].producto.precio * +data[i].cantidad;
          totalCompra += +data[i].producto.compra * +data[i].cantidad;
        }

        res.json({
          ok: true,
          data,
          total,
          totalCompra
        });
      });
  }
);

app.post(
  '/ventas-mostrador',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let ventas = new VentaMostrador({
      producto: body.producto,
      cantidad: body.cantidad,
      venta: body.venta
    });

    ventas.save((err, ventas) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        ventas
      });
    });
  }
);

app.delete(
  '/ventas-mostrador/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    // console.log(id);

    VentaMostrador.find({ _id: id })
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
          cliente: data
        });
      });
  }
);

export default app;
