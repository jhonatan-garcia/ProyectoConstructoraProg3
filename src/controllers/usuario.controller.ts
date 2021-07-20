import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {Credenciales, ResetearClave, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';

@authenticate('admin')
export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public servicioSesion: SesionService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['Id_usuario', 'Contrasena'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'Id_usuario'>,
  ): Promise<Usuario> {

    const claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria()
    console.log(claveAleatoria)
    const claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria)
    console.log(claveCifrada)

    usuario.Contrasena = claveCifrada
    const usuarioCreado = await this.usuarioRepository.create(usuario);
    if (usuarioCreado) {

      const contenido = `Hola, buen día. <br/>Usted fue registrado en la plataforma de la constructora. Sus credenciales de acceso son: <br/>
      <ul>
        <li>Usuario: ${usuarioCreado.Correo}</li>
        <li>Contraseña: ${claveAleatoria}</li>
        <li>Rol: ${usuarioCreado.Rol}</li>
      </ul>

      Gracias por confiar en esta constructora.
      `;


      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.Correo, llaves.asuntoNuevoUsuario, contenido);
    }

    return usuarioCreado
  }

  @authenticate.skip()
  @post('/rest-password')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {

    const usuario = await this.usuarioRepository.findOne({where: {Correo: resetearClave.correo}})

    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }
    const claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria()
    console.log(claveAleatoria)
    const claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria)
    console.log(claveCifrada)

    usuario.Contrasena = claveCifrada
    await this.usuarioRepository.update(usuario);
    const contenido = `Hola, sus datos son: Usuario: ${usuario.Correo} y Contraseña: ${claveAleatoria}.
      `;

    this.servicioNotificaciones.EnviarNotificacionPorSMS('+57' + usuario.Celular.toString(), contenido);
    return {
      envio: "OK"
    };
  }

  @authenticate.skip()
  @post('/identificar-usuario')
  async validar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales)
          }
        }
      }
    )
    credenciales: Credenciales
  ): Promise<object> {
    const usuario = await this.usuarioRepository.findOne({where: {Correo: credenciales.nombre_usuario, Contrasena: credenciales.clave}});
    if (usuario) {
      const token = this.servicioSesion.GenerarToken(usuario);
      return {

        username: usuario.Correo,
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Rol: usuario.Rol,
        tk: token
      };
    } else {
      throw new HttpErrors[401]("Las credenciales no son correctas");

    }
  }

  @authenticate.skip()
  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }


  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
