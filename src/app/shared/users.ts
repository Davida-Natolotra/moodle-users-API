import { Injectable, signal } from '@angular/core';
import { MdlUser } from '../interfaces/mdl-user';

@Injectable({
  providedIn: 'root',
})
export class Users {
  currentUser = signal<MdlUser | null>(null);

  setUser(user: MdlUser) {
    this.currentUser.set(user);
  }

  clearUser() {
    this.currentUser.set(null);
  }
}
