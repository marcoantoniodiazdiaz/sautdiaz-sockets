import { Request, Response } from 'express';
import Servicios, {
  IServicios
} from '../classes/interfaces/servicios.interface';
import Movimientos, {
  IMovimientos
} from '../classes/interfaces/movimiento.interface';
import {
  verificaToken,
  verificaAdmin_Role
} from '../middlewares/authentication';
import * as _ from 'underscore';

import { app } from './router';

let movimientos = [];

let CUENTAS_PARCIALES: any;
let CUENTAS_TOTALES: any;

function init() {
  CUENTAS_TOTALES = {
    caja: 0.0,
    bancos: 0.0,
    proveedores: 0.0,
    clientes: 0.0,
    mercancias: 0.0
  };

  CUENTAS_PARCIALES = {
    caja: 0.0,
    bancos: 0.0,
    proveedores: 0.0,
    clientes: 0.0,
    mercancias: 0.0
  };
}

app.get(
  '/contabilidad/:start/:end',
  [verificaToken, verificaAdmin_Role],
  async (req: Request, res: Response) => {
    const start = req.params.start;
    const end = req.params.end;

    init();

    await getTotalCuentas();
    const movimientos = await getTotalCuentasFechas(start, end);
    const servicios = await getServicios(start, end);

    res.json({
      ok: true,
      estaFecha: {
        caja: CUENTAS_PARCIALES.caja,
        bancos: CUENTAS_PARCIALES.bancos,
        proveedores: CUENTAS_PARCIALES.proveedores,
        clientes: CUENTAS_PARCIALES.clientes,
        mercancias: CUENTAS_PARCIALES.mercancias
      },
      total: {
        caja: CUENTAS_TOTALES.caja,
        bancos: CUENTAS_TOTALES.bancos,
        proveedores: CUENTAS_TOTALES.proveedores,
        clientes: CUENTAS_TOTALES.clientes,
        mercancias: CUENTAS_TOTALES.mercancias
      },
      movimientos,
      servicios
    });

    /*
                                      Cuentas:
                                      0: Caja:            5d0a67b88823460bd47815af
                                      1: Bancos:          5d0a67c58823460bd47815b0
                                      2: Proveedores:     5d0a67d98823460bd47815b2
                                      3: Clientes:        5d0a67ce8823460bd47815b1
                                      4. Mercancias:      5d0a67f78823460bd47815b3
                                      5. SuperUser

                                  */
  }
);

let getTotalCuentas = () => {
  return new Promise(pass => {
    Movimientos.find({}).exec((err, data) => {
      for (let i = 0; i < data.length; i++) {
        switch (+data[i].cuenta) {
          case 0:
            CUENTAS_TOTALES.caja += +data[i].cantidad;
            break;
          case 1:
            CUENTAS_TOTALES.bancos += +data[i].cantidad;
            break;
          case 2:
            CUENTAS_TOTALES.proveedores += +data[i].cantidad;
            break;
          case 3:
            CUENTAS_TOTALES.clientes += +data[i].cantidad;
            break;
          case 4:
            CUENTAS_TOTALES.mercancias += +data[i].cantidad;
            break;
        }
      }
      pass(true);
    });
  });
};

let getTotalCuentasFechas = (start: string, end: string) => {
  return new Promise(pass => {
    Movimientos.find({
      fecha: {
        $gte: start,
        $lte: end
      }
    })
      .sort({
        fecha: -1
      })
      .exec((err, data) => {
        for (let i = 0; i < data.length; i++) {
          switch (+data[i].cuenta) {
            case 0:
              CUENTAS_PARCIALES.caja += +data[i].cantidad;
              break;
            case 1:
              CUENTAS_PARCIALES.bancos += +data[i].cantidad;
              break;
            case 2:
              CUENTAS_PARCIALES.proveedores += +data[i].cantidad;
              break;
            case 3:
              CUENTAS_PARCIALES.clientes += +data[i].cantidad;
              break;
            case 4:
              CUENTAS_PARCIALES.mercancias += +data[i].cantidad;
              break;
          }
        }
        pass(data);
      });
  });
};

let getServicios = async (start: string, end: string) => {
  return new Promise(pass => {
    Servicios.find({
      fecha: {
        $gte: start,
        $lte: end
      }
    })
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'marca'
        }
      })
      .populate({
        path: 'vehiculo',
        populate: {
          path: 'cliente'
        }
      })
      .exec((err, data) => {
        pass(data);
      });
  });
};

export default app;
