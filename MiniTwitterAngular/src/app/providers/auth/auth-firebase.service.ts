import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  private user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  // Obtener el estado de autenticación
  get authenticated(): boolean {
    return this.user != null; // True ó False
  }
  // Obtener el observador del usuario actual
  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }
  // Registro con email
  signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
  // Ingreso con email
  signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  // Autenticación con Facebook
  authWithFacebook(): Promise<firebase.auth.UserCredential> {
    const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return this.afAuth.auth.signInWithPopup(provider);
  }
  // Autenticación con Google
  authWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  // Recuperar contraseña
  resetPassword(email): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  // Verificar correo
  verifyEmail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }
  // Finalizar sesión
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  // Actualizar perfil firebase authentication
  updateProfile(name?, photo?): Promise<void> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name ? name : this.afAuth.auth.currentUser.displayName,
      photoURL: photo ? photo : this.afAuth.auth.currentUser.photoURL,
    });
  }
}
