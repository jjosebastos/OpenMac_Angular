import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


export interface UsuarioRegistro {
    name: string,
    email: string,
    password?: string,
    role: string
}



export interface AuthResponse {
    jwt: string;
    usuario: UsuarioRegistro;
}

export interface MensagemResponse {
  message: string;
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {


    private usersEndpoint = 'http://localhost:8080/api/v1/users';
    private codeVerifyEndpoint = 'http://localhost:8080/api/v1/auth';
    private usuarioAtual = signal<UsuarioRegistro | null> (null);
    private emailParaVerificacao = signal<string | null>(null);

    constructor(private http: HttpClient,
            private toastr: ToastrService
    ) { }


    registrarUsuario(dadosUsuario: UsuarioRegistro): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.usersEndpoint}`, dadosUsuario).pipe(

            tap((resp) => {
                this.usuarioAtual.set(resp.usuario);
                localStorage.setItem('token', resp.jwt);
                this.emailParaVerificacao.set(dadosUsuario.email);
            })
        )
    };


    validarCodigo(codigo: string): Observable<AuthResponse> {
    const email = this.emailParaVerificacao();
    const payload = { code: codigo, email: email};

    if (!email) {
      throw new Error("Email não encontrado no estado. Refaça o login.");
    }

    return this.http.post<AuthResponse>(`${this.codeVerifyEndpoint}/verify`, payload).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.jwt);
        this.usuarioAtual.set(resp.usuario); 
        this.emailParaVerificacao.set(email)
      })
    );
  }

    validarUsuario(email: string, password: string) {
    const payload = { email, password };

    return this.http.post<MensagemResponse>(this.codeVerifyEndpoint, payload).pipe(
        tap((resp) => {
            console.log(resp.message);
            
            // Salva na memória do Angular E no navegador (blindagem dupla)
            this.emailParaVerificacao.set(email);
            sessionStorage.setItem('email_2fa', email); 
        })
    );
}

   reenviarCodigo() { 

    const email = this.emailParaVerificacao(); 

    if (!email) {
        console.error("E-mail não encontrado nem na memória nem no Session Storage.");
        throw new Error("E-mail não encontrado");
    }

    const payload = { email };
    return this.http.post<MensagemResponse>(`${this.codeVerifyEndpoint}/resend`, payload).pipe(
        tap((resp) => {
            console.log(resp.message);
        })
    );
}

    redefinirSenha(email: string): Observable<void> {
        const payload = { email };
        
        return this.http.post<void>(`${this.codeVerifyEndpoint}/reset`, payload).pipe(
            tap(() => {

                console.log(`[AuthService] Reset solicitado com sucesso para: ${email}`);
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('[AuthService] Falha na comunicação', error);
                
                // Formata uma mensagem amigável e repassa o erro para o componente
                return throwError(() => new Error('Serviço indisponível no momento. Tente novamente mais tarde.'));
            })
        );
    }
    getUsuarioAtual(): UsuarioRegistro | null{
        return this.usuarioAtual();
    }

    mascararEmail(email: string): string {
        if (!email || !email.includes('@')) {
            return email;
        }

        const [nome, dominio] = email.split('@');
        if (nome.length <= 2) {
            return `${nome[0]}***@${dominio}`;
        }
        return `${nome.substring(0, 2)}***@${dominio}`;
    }

} 