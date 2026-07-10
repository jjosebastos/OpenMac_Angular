import { CommonModule } from '@angular/common';
import { Component , signal} from '@angular/core';
import { Register } from '../register/register';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

type TelaAtiva = 'login' | 'verificacao' | 'cadastro';

@Component({
  selector: 'app-login',
  imports: [CommonModule, Register],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {


  constructor(private authService: AuthService,
    private toastr: ToastrService){
    
  }


  mostrarSenha = signal(false);
  alternarVisualizacao() {
    this.mostrarSenha.update(visible => !visible);
  }

  telaAtual = signal<TelaAtiva>('login');

  mudarTela(novaTela: TelaAtiva){
    this.telaAtual.set(novaTela);
  }
}
