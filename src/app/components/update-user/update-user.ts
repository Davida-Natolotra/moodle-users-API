import { Component } from '@angular/core';
import { Users } from '../../shared/users';
import { MdlUser } from '../../interfaces/mdl-user';
import { MdlServicesService } from '../../services/mdl-services.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUser {
  constructor(private usersService: Users, private mdlService: MdlServicesService) {}
  user: MdlUser | null = this.usersService.currentUser();
}
