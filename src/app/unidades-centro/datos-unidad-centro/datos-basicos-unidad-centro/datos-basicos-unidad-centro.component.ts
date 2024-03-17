import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { DatosUnidadCentroComponent } from '../datos-unidad-centro.component';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-datos-basicos-unidad-centro',
  templateUrl: './datos-basicos-unidad-centro.component.html',
  styleUrls: ['./datos-basicos-unidad-centro.component.scss']
})
export class DatosBasicosUnidadCentroComponent implements OnInit {

  ciclos: Ciclo[];
  unidadCentro: UnidadCentro;
  datosUnidadesCentroForm: FormGroup;

  constructor(
    private ciclosService: CiclosService,
    public unidadCentroService: UnidadesCentroService,
    private datosUnidadCentro: DatosUnidadCentroComponent,
  ) { this.unidadCentro = datosUnidadCentro.datosEditarUnidadCentro }

  ngOnInit(): void {
    this.setForm();
    this.getCiclos();
    this.datosUnidadesCentroForm.valueChanges.subscribe(form => {
      const ciclo = this.ciclos.find(ciclo => ciclo.id_ciclo === form.id_ciclo);
      form.ciclo = ciclo ? ciclo.ciclo : '';
      this.unidadCentroService.setDatosBasicosUnidadCentro(form)
    })
  }

  setForm(): void {
    this.datosUnidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentroService.unidadCentro.id_ciclo, Validators.required),
      ciclo: new FormControl(this.unidadCentroService.unidadCentro.ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentroService.unidadCentro.observaciones)
    })
  }

  async getCiclos() {
    const RESP = await this.ciclosService.getAllCiclos().toPromise();

    if (RESP.ok) {
      this.ciclos = RESP.data as Ciclo[];
    }
  }
}
