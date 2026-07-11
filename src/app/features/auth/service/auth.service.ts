import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Routes } from '@angular/router';
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

    constructor(private http: HttpClient) { }


    registrarUsuario(dadosUsuario: UsuarioRegistro): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.usersEndpoint}`, dadosUsuario).pipe(

            tap((resp) => {
                this.usuarioAtual.set(resp.usuario);
                localStorage.setItem('token', resp.jwt);
            })
        )
    };


    validarCodigo(email: string, codigo: string): Observable<AuthResponse> {
    const payload = { email, code: codigo };

    return this.http.post<AuthResponse>(`${this.codeVerifyEndpoint}/verify`, payload).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.jwt);
        this.usuarioAtual.set(resp.usuario); 
      })
    );
  }

    validarUsuario(email: string, password: string){
    const payload = { email, password}

     return this.http.post<MensagemResponse>(this.codeVerifyEndpoint, payload).pipe(
        tap((resp) => {
            console.log(resp.message)
        })
    );

    }


    getUsuarioAtual(): UsuarioRegistro | null{
        return this.usuarioAtual();
    }

}