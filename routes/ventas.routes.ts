import { Request, Response } from 'express';
import Ventas, { IVenta } from '../classes/interfaces/venta.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get(
  '/ventas',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    Ventas.find({})
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
  '/ventas/servicio/:servicio',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let servicio = req.params.servicio;

    Ventas.find({
      servicio: servicio
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
        let mo = 0;
        let totalCompra = 0;

        // console.log(data[0]);

        for (let i = 0; i < data.length; i++) {
          if (data[i].isDiff === true) {
            total += +data[i].precioDiferente * +data[i].cantidad;
            totalCompra += +data[i].producto.compra * +data[i].cantidad;
          } else {
            total += +data[i].producto.precio * +data[i].cantidad;
            totalCompra += +data[i].producto.compra * +data[i].cantidad;
          }

          if (data[i].producto.departamento._id == '5d15130f3db192098e178ed0') {
            mo += +data[i].producto.precio * +data[i].cantidad;
          }
        }

        res.json({
          ok: true,
          data,
          total,
          mo,
          totalCompra
        });
      });
  }
);

app.post(
  '/ventas',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let ventas = new Ventas({
      producto: body.producto,
      cantidad: body.cantidad,
      servicio: body.servicio
    });

    ventas.save((err, data) => {
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

// Editar Precio de Producto
app.put('/ventas/producto/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['precioDiferente']);

  Ventas.findByIdAndUpdate(
    id,
    {
      isDiff: true,
      precioDiferente: body.precioDiferente
    },
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
        data,
      });
    }
  );
});

app.delete(
  '/ventas/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    console.log(id);

    Ventas.find({ _id: id })
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
