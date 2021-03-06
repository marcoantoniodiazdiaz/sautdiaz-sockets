import { Request, Response } from 'express';
import Servicios, {
  IServicios
} from '../classes/interfaces/servicios.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

app.get('/servicios', verificaToken, (req: Request, res: Response) => {
  Servicios.find({})
    .sort({
      fecha: -1
    })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'cliente'
      }
    })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'marca'
      }
    })
    .populate({
      path: 'trabajador'
    })
    // .populate('productos')
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

app.get('/servicios/:id', verificaToken, (req: Request, res: Response) => {
  let id = req.params.id;

  Servicios.find({
    _id: id
  })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'cliente'
      }
    })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'marca'
      }
    })
    .populate({
      path: 'trabajador'
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

app.get('/servicios/vehiculo/:id', verificaToken, (req: Request, res: Response) => {
  let id = req.params.id;

  Servicios.find({
    vehiculo: id
  })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'cliente'
      }
    })
    .populate({
      path: 'vehiculo',
      populate: {
        path: 'marca'
      }
    })
    .populate({
      path: 'trabajador'
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

// Por termino de busqueda
app.get(
  '/servicios/find/:find',
  verificaToken,
  (req: Request, res: Response) => {
    let find = req.params.find;

    Servicios.find()
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'cliente'
        }
      })
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'marca'
        }
      })
      .populate({
        path: 'trabajador'
      })
      .exec((err, data: any[]) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        data = data.filter(servicio => {
          return ((servicio['vehiculo']['marca']['nombre'] + servicio['vehiculo']['submarca'] + servicio['vehiculo']['cliente']['nombre']))
          
          .toLowerCase().indexOf(find.toLowerCase()) > -1;
        });

        res.json({
          ok: true,
          data
        });
      });
  }
);

app.get(
  '/servicios/cliente/:cliente',
  verificaToken,
  (req: Request, res: Response) => {
    let cliente: string = req.params.cliente;

    Servicios.find()
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'cliente'
        }
      })
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'marca'
        }
      })
      .populate({
        path: 'trabajador'
      })
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        let servicios: any = [];

        data.forEach(servicio => {
          if (servicio.vehiculo.cliente._id == cliente) {
            servicios.push(servicio);
          }
        });

        data = servicios;

        res.json({
          ok: true,
          data
        });
      });
  }
);

// Crear servicio
app.post(
  '/servicios',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let body = req.body;

    let servicios = new Servicios({
      fecha: new Date().toISOString(),
      vehiculo: body.vehiculo,
      estado: body.estado,
      trabajador: body.trabajador
    });

    servicios.save((err, servicios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        servicios
      });
    });
  }
);

app.put(
  '/servicios/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['vehiculo', 'trabajador', 'estado']);

    Servicios.findByIdAndUpdate(
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

app.delete(
  '/servicios/:id',
  [verificaToken, verificaAdmin_Role],
  (req: Request, res: Response) => {
    let id = req.params.id;

    Servicios.find({ _id: id })
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
          servicio: data
        });
      });
  }
);

export default app;
