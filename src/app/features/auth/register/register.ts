import { Component, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  host: { class: 'w-full flex flex-col items-center justify-center' }
})
export class Register {

  
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private toastr:ToastrService
  ) {

    this.formularioCadastro = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {

      validators: this.checarSenhas
    });
  }


  dropdownAberto = false;

  toggleDropdown(){
    this.dropdownAberto = !this.dropdownAberto;
  }

  selecionarOpcao(valor: string) {
    this.formularioCadastro.get('role')?.setValue(valor);
    this.dropdownAberto = false;
  }


  obterLabelPermissao(valor: string | null): string {
    if (!valor) return '';
    const mapeamento: { [key: string]: string } = {
      'ADMIN': 'Admin',
      'ATTENDANT': 'Atendente',
      'TECHNICAL': 'Técnico'
    };
    return mapeamento[valor] || valor;
  }

  onVoltarParaLogin = output();
  carregando = signal(false);
  erroMensagem = signal<string | null>(null);
  formularioCadastro: FormGroup;


  checarSenhas(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmarSenha = group.get('confirmPassword')?.value;

    return password === confirmarSenha ? null : { naoBate: true };
  }


 onSubmit() {
    if (this.formularioCadastro.valid) {
      const { name, email, password, role } = this.formularioCadastro.value;

      this.authService.registrarUsuario({ name, email, password, role }).subscribe({
        next: (resp) => {
          this.toastr.success('Sua conta foi criada com sucesso!');
          this.voltar();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          const mensagemDoServidor = erro.error.message || 'Houve um erro no cadastro. Tente novamente.';
          
          this.toastr.error(mensagemDoServidor, 'Erro no cadastro');
        }
      });

    } else {
      this.formularioCadastro.markAllAsTouched();
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios corretamente.', 'Formulário Inválido');
    }
  }
  voltar() {
    this.onVoltarParaLogin.emit();
  }


} 