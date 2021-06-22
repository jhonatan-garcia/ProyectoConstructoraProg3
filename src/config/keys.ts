export namespace Keys {
  export const origeCorreoElectronico = 'alberth.1701810797@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo usuario] Mensaje de bienvenida';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 12);
  export const claveSecretaJWT = 'jwt@Prog3*';
  export const twilioPhone = '+13342928642';
  export const carpetaImagenCliente = '../../archivos/clientes';
  export const carpetaImagenProyecto = '../../archivos/proyectos';
  export const nombreCampoImagenCliente = 'file';
  export const nombreCampoImagenProyecto = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenCliente = 1024 * 1024;
}
