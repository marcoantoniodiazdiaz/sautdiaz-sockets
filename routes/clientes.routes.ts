import { Request, Response } from 'express';
import Clientes, { ICliente } from '../classes/interfaces/cliente.interface';
import { MongoError } from 'mongodb';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as axios from 'axios';
import * as _ from 'underscore';
import bcrypt from 'bcrypt';

import { app } from './router';
import { GOOGLE_NOTIFICATIONS } from '../global/environment';

app.get('/clientes', [verificaToken], (req: Request, res: Response) => {
  Clientes.find({})
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
});

app.get('/clientes/:id', [verificaToken], (req: Request, res: Response) => {
  let id = req.params.id;

  Clientes.findById(id).exec((err, data) => {
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

app.get('/clientes/nombre/:nombre',
  [verificaToken],
  (req: Request, res: Response) => {
    let nombre = req.params.nombre;
    let regex = new RegExp(nombre);

    Clientes.find({
      nombre: {
        $regex: regex
      }
    })
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
  '/clientes',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    console.log(body);

    let clientes = new Clientes({
      nombre: body.nombre,
      calle: body.calle,
      numero: body.numero,
      colonia: body.colonia,
      email: body.email,
      telefono: body.telefono
    });

    Clientes.create(clientes, (err: MongoError, data: any) => {
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

// Enviar notificación.
app.post(
  '/clientes/notification/:device/:title/:body',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let device = req.params.device;
    let title = req.params.title;
    let body = req.params.body;

    let toSend = {
      to: device,
      notification: {
        title: title,
        body: body
      }
    };

    axios.default
      .post('https://fcm.googleapis.com/fcm/send', toSend, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: GOOGLE_NOTIFICATIONS
        }
      })
      .then(resp => {
        res.json({
          ok: true,
          message: 'Enviado con exito!'
        });
      })
      .catch(err => {
        res.status(400).json({
          ok: false,
          err
        });
      });
  }
);

app.put(
  '/clientes/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
      'nombre',
      'calle',
      'numero',
      'colonia',
      'email',
      'telefono'
    ]);

    Clientes.findByIdAndUpdate(
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
          data: data
        });
      }
    );
  }
);

// Editar dispositivos

app.put(
  '/clientes/devices/:id',
  [verificaToken],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['devices']);

    Clientes.findByIdAndUpdate(
      id /*{ $push: { devices: body.devices } }*/,
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
          data: data
        });
      }
    );
  }
);

app.delete(
  '/clientes/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Clientes.find({ _id: id })
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

// Activar Cliente
app.put('/clientes/activate/:telefono', (req, res) => {
  let telefono = req.params.telefono;
  let body = _.pick(req.body, ['password', 'activated']);

  if (body.password == [] || body.password == null) {
    return res.status(400).json({
      ok: false,
      err: 'Error al activar, datos no validos'
    });
  }

  let encypted = bcrypt.hashSync(body.password, 10);

  body.password = encypted;

  Clientes.findOneAndUpdate(
    {
      telefono,
      activated: false
    },
    body,
    { new: true, runValidators: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!data) {
        return res.status(400).json({
          ok: false,
          err: 'El cliente ya esta activo o no existe'
        });
      }

      res.json({
        ok: true,
        data: data
      });
    }
  );
});

export default app;
