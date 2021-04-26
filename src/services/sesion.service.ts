import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Funcion que genera un token JWT
   */
  GenerarToken(usuario: Usuario): string {
    let tk = jwt.sign({
      exp: llaves.tiempoVencimientoJWT,
      data: {
        username: usuario.Correo,
        role: usuario.Rol
      }
    }, llaves.claveSecretaJWT);
    return tk;
  }

   /**
   * Verificar la validéz de un token JWT
   */
    VerificarTokenJWT(token: string) {
      try {
        let decoded = jwt.verify(token, llaves.claveSecretaJWT);
        return decoded;
      } catch {
        return null;
      }
    }
}
