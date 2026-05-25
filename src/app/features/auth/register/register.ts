import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { send } from 'process';
import { error } from 'console';
import e from 'express';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  host: { class: 'w-full flex flex-col items-center justify-center' }
})
export class Register {
  onVoltarParaLogin = output();



  formularioCadastro: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.formularioCadastro = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {

      validators: this.checarSenhas
    });
  }


  checarSenhas(group: AbstractControl) {
    const senha = group.get('password')?.value;
    const confirmarSenha = group.get('confirmPassword')?.value;

    return senha === confirmarSenha ? null : { naoBate: true };
  }


  onSubmit() {
    if (this.formularioCadastro.valid) {
      const { name, email, password } = this.formularioCadastro.value;

      this.authService.registrarUsuario({ name, email, senha: password}).subscribe({
        next: (resp) => {
          alert('Cadastro realizado com sucesso!');
          this.voltar();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Houve um erro no cadastro. Tente novamente.');
        }
      })

    } else {
      this.formularioCadastro.markAllAsTouched();
    }
  }
  voltar() {
    this.onVoltarParaLogin.emit();
  }
}