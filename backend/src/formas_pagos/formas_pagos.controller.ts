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
import { FormasPagosService } from './formas_pagos.service';
import { CreateFormasPagoDto } from './dto/create-formas_pago.dto';
import { UpdateFormasPagoDto } from './dto/update-formas_pago.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('formas_pagos')
@UseGuards(AuthGuard)
export class FormasPagosController {
  constructor(private readonly formasPagosService: FormasPagosService) {}

  @Post()
  create(@Body() createFormasPagoDto: CreateFormasPagoDto) {
    return this.formasPagosService.create(createFormasPagoDto);
  }

  @Get()
  findAll() {
    return this.formasPagosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formasPagosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormasPagoDto: UpdateFormasPagoDto,
  ) {
    return this.formasPagosService.update(+id, updateFormasPagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formasPagosService.remove(+id);
  }
}
