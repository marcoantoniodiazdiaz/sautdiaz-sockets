import * as jwt from 'jsonwebtoken';
import { SEED } from '../global/environment';
import * as HttpStatus from 'http-status-codes';

export const verificaToken = (req: any, res: any, next: Function) => {
  const token: string = req.get('token')!;
  
  jwt.verify(token, SEED, (err: any, decoded: any) => {
      if (err) {
          res;
          return res.status(HttpStatus.UNAUTHORIZED).json({
              ok: false,
              err: {
                  // message: 'Token no válido'
                  message: 'Acceso denegado al Sautdiaz Server'
                }
              });
            }
          
            req.usuario = decoded.usuario;
          next();
  });
};

export const verificaAdmin_Role = (req: any, res: any, next: Function) => {
  const usuario = req.usuario;
  
  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }
};
