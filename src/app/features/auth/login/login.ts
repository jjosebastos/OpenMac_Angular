import { CommonModule } from '@angular/common';
import { Component , signal} from '@angular/core';
import { Register } from '../register/register';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerifyComponent } from '../verify/verify';

type TelaAtiva = 'login' | 'verify' | 'cadastro';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, Register, ReactiveFormsModule, VerifyComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  telaAtual = signal<TelaAtiva>('login');
  loginForm: FormGroup;
  mostrarSenha = signal(false);

  constructor(private toastr: ToastrService, 
    private authService: AuthService,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  confirmarUsuario() {
  if (this.loginForm.valid) {

    const { email, password } = this.loginForm.value;

    this.authService.validarUsuario(email, password).subscribe({
      next: (resp) => {
        this.toastr.success('Código enviado para o seu e-mail!');
        this.mudarTela('verify'); 
      },
      error: (erro) => {
        this.toastr.error('E-mail ou senha incorretos.', 'Erro');
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
    this.toastr.warning('Por favor, preencha o e-mail e a senha.', 'Atenção');
  }
}

  confirmarCodigo(email: string, codigo: string) {
    this.authService.validarCodigo(email, codigo).subscribe({
      next: (resposta) => {
        this.toastr.success('Login efetuado com sucesso!');
      },
      error: (erro) => {
        this.toastr.error('Código inválido', 'Erro');
      }
    });
  }


  alternarVisualizacao() {
    this.mostrarSenha.update(visible => !visible);
  }



  mudarTela(novaTela: TelaAtiva){
    this.telaAtual.set(novaTela);
  }
}
