import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PreciosService } from './precios.service';
import { CreatePrecioDto } from './dto/create-precio.dto';
import { UpdatePrecioDto } from './dto/update-precio.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriasService } from 'src/categorias/categorias.service';
//cSpell:ignore categorias, categoria
@Controller('precios')
@UseGuards(AuthGuard)
export class PreciosController {
  constructor(
    private readonly preciosService: PreciosService,
    private readonly categoriasService: CategoriasService,
  ) {}

  @Post()
  create(@Body() createPrecioDto: CreatePrecioDto) {
    return this.preciosService.create(createPrecioDto);
  }

  @Get()
  findAll() {
    return this.preciosService.findAll();
  }
  @Get('get/productos')
  async getProducto() {
    const precios = await this.preciosService.findActive();
    const categorias = await this.categoriasService.findActive();
    return {
      precios,
      categorias,
    };
  }
  @Get('productos/:id')
  findByProducto(@Param('id') id: string) {
    return this.preciosService.findByProducto(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecioDto: UpdatePrecioDto) {
    return this.preciosService.update(+id, updatePrecioDto);
  }
  @Patch('estado/:id')
  estado(@Param('id') id: string) {
    return this.preciosService.changeEstado(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preciosService.remove(+id);
  }
}
