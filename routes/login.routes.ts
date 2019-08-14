import Clientes, { ICliente } from '../classes/interfaces/cliente.interface';
import * as _ from 'underscore';
import bcrypt from 'bcrypt';
import { app } from './router';
import * as jwt from 'jsonwebtoken';
import { SEED, TOKEN_CAD } from '../global/environment';

app.post('/login', (req, res) => {
  let body = req.body;

  if (!body.telefono || !body.password) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Datos incompletos para el inicio de sesion'
      }
    });
  }

  Clientes.findOne({ telefono: body.telefono }, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!data) {
      return res.status(400).json({
        ok: false,
        err: {
          // message: '(Usuario) o contraseña incorrectos'
          message: 'Este telefono no corresponde a ningun cliente registrado'
        }
      });
    }

    if (!data.activated) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El usuario esta desactivado'
        }
      });
    }

    if (!bcrypt.compareSync(body.password, data.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'La contraseña es incorrecta'
        }
      });
    }

    let token = jwt.sign(
      {
        usuario: data
      },
      SEED,
      { expiresIn: TOKEN_CAD }
    );

    res.json({
      ok: true,
      data,
      token
    });
  });
});

export default app;
