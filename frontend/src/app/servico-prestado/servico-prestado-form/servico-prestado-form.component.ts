import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../servico-prestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success : boolean = false;
  errors: string[];

  constructor(
    private clienteService : ClientesService,
    private servicoPrestadoService : ServicoPrestadoService
    ) { 
    this.servico = new ServicoPrestado();

  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe(response => this.clientes = response);

  }

  onSubmit(){
    this.servicoPrestadoService.salvar(this.servico)
    .subscribe(response => {
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado(); // retorna o servico vazio para que possa cadastra um novo servico
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    })  
  }
}
