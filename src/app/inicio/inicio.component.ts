import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mensaje(){
    Swal.fire({
      icon: 'success',
      title: '¡Hecho!',
      text: 'Funciona!',
      showConfirmButton: false,
      timer:3000
      })
  }


  constructor() { }

  ngOnInit(): void {
  }

}
