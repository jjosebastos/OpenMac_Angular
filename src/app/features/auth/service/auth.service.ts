import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UsuarioRegistro {
    name: string,
    email: string,
    senha?: string
}

export interface AuthResponse {
    token: string;
    usuario: UsuarioRegistro;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://localhost:8080/auth';

    private usuarioAtual: UsuarioRegistro | null = null;

    constructor(private http: HttpClient) { }


    registrarUsuario(dadosUsuario: UsuarioRegistro): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}`, dadosUsuario).pipe(

            tap((resp) => {
                this.usuarioAtual = resp.usuario;
                localStorage.setItem('token', resp.token);
            })
        )
    };

    getUsuarioAtual(): UsuarioRegistro | null {
        return this.usuarioAtual;
    }

}