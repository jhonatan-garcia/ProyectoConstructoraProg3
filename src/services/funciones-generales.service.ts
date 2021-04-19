import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const generator = require('generate-password');
const Crypto = require('crypto-js')

@injectable({scope: BindingScope.TRANSIENT})
export class FuncionesGeneralesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  GenerarClaveAleatoria(): string {
    let clave = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true
    });
    return clave
  }

  CifrarTexto(texto: string): string {
    let textoCifrado = Crypto.MD5(texto).toString()
    return textoCifrado;
  }

}
