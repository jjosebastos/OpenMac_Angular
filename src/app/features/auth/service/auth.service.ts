import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UsuarioRegistro {
    name: string,
    email: string,
    password?: string,
    role: string
}

export interface Credentials {
    name: string,
    password: string
}

export interface AuthResponse {
    token: string;
    usuario: UsuarioRegistro;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private apiUrl = 'http://localhost:8080/api/v1/users';

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


    solicitarCodigoLogin(dadosLogin: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, dadosLogin);
    }

    
    validarCodigo(email: string, codigo: string): Observable<AuthResponse>{
        const payload = { email, code: codigo};

        return this.http.post<AuthResponse>(`${this.apiUrl}/verify`, payload).pipe(
            tap((resp) => {
                this.usuarioAtual = resp.usuario;
            })
        )
    }

    getUsuarioAtual(): UsuarioRegistro | null {
        return this.usuarioAtual;
    }

}