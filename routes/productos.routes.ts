import { Request, Response } from 'express';
import Productos, { IProducto } from '../classes/interfaces/producto.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/productos', verificaToken, (req, res) => {
  Productos.find({
    codigo: {
      $not: {
        $lte: '0' || 1,
      }
    }
  })
    .sort({
      nombre: 1
    })
    .populate('departamento')
    .exec((err, data) => {
      // console.log(data);

      let compra = 0;
      let venta = 0;

      data.forEach(producto => {
        compra += +producto['compra'] * +producto['existencia'];
        venta += +producto['precio'] * +producto['existencia'];
      });

      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        data,
        compra,
        venta
      });
    });
});

// BUSCAR POR ID
app.get(
  '/productos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    // console.log(id);

    Productos.findById(id)
      .populate('departamento')
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
  '/productos/nombre/:nombre',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let nombre = req.params.nombre;
    let regex = new RegExp(nombre);

    Productos.find({
      nombre: {
        $regex: regex
      },
      codigo: {
        $not: {
          $lte: '0' || 1,
        }
      }
    })
      .limit(5)
      .populate('departamento')
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

app.post('/productos', [verificaToken, verificaAdmin_Role], function(
  req: Request,
  res: Response
) {
  let body = req.body;

  let productos = new Productos({
    nombre: body.nombre,
    codigo: body.codigo,
    departamento: body.departamento,
    precio: body.precio,
    compra: body.compra,
    existencia: body.existencia
  });

  productos.save((err, productos) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      productos
    });
  });
});

app.put(
  '/productos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    console.log(id);

    let body = _.pick(req.body, [
      'nombre',
      'codigo',
      'departamento',
      'precio',
      'compra',
      'existencia'
    ]);

    Productos.findByIdAndUpdate(
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
          producto: data
        });
      }
    );
  }
);

app.delete(
  '/productos/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Productos.find({ _id: id })
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
          producto: data
        });
      });
  }
);

// EDITAR CANTIDAD
app.put(
  '/productos/existencia/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['existencia']);

    Productos.findByIdAndUpdate(
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
          producto: data
        });
      }
    );
  }
);

export default app;
