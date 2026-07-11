import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  imports: [CommonModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class VerifyComponent {

  constructor( 
    private authService: AuthService,
    private toastr: ToastrService
  ){}

  manipularFoco(event: KeyboardEvent, anterior: HTMLInputElement | null, proximo: HTMLInputElement | null) {
    const inputAtual = event.target as HTMLInputElement;

    if(inputAtual.value.length >= 1 && proximo){
      proximo.focus();
    }

    if(event.key === 'Backspace' && inputAtual.value.length === 0 && anterior){
      anterior.focus();
    }
  }

  enviarCodigoAgrupado(b1: string, b2: string, b3: string, b4: string, b5: string, b6: string) {
    const codigoCompleto = `${b1}${b2}${b3}${b4}${b5}${b6}`;

    if (codigoCompleto.length < 6) {
      this.toastr.warning('Por favor, preencha todos os 6 dígitos do código.', 'Código Incompleto');
      return;
    }
    const emailDaSessao = 'email.temporario@openmac.com.br'; 

    this.authService.validarCodigo(emailDaSessao, codigoCompleto).subscribe({
      next: (resposta) => {
        this.toastr.success('Acesso liberado com sucesso!');

      },
      error: (erro) => {
        this.toastr.error('O código informado é inválido ou expirou.', 'Erro na Verificação');
      }
    });
  }

  dispararReenvio() {
    this.toastr.info('Solicitando um novo código...', 'Aguarde');
  }
}
