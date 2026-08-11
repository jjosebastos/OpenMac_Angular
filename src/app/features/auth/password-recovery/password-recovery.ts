import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-recovery.html',
  styleUrl: './password-recovery.css',
})
export class PasswordRecovery {
  
  onVoltarParaLogin = output();
  isLoading = false;
  formularioRecovery: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ){

    this.formularioRecovery = this.fb.group({
      email: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.formularioRecovery.valid) {
        const { email } = this.formularioRecovery.value;
          this.isLoading = true; 

          this.authService.redefinirSenha(email).subscribe({
              next: () => {
                  this.isLoading = false;
                  this.toastr.success(
                      'Se houver uma conta associada a este e-mail, enviaremos as instruções de recuperação.'
                  );
              },
              error: (err: Error) => {
                  this.isLoading = false;
    
                  this.toastr.error(err.message);
              }
          });
      
    } else {
      this.formularioRecovery.markAllAsTouched();
      this.toastr.warning('Por favor, insira um email valido para a recuperação de senha')
    }
  }

  voltar(){
    this.onVoltarParaLogin.emit();
  }
   
}
