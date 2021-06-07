import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../Models/Users';
import { ApiService } from '../Services/api.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header-after-login',
  templateUrl: './header-after-login.component.html',
  styleUrls: ['./header-after-login.component.css']
})
export class HeaderAfterLoginComponent implements OnInit {
  public User :Users;
  public CurrentUser =null;
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService) { }
  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('email'));
    this.CurrentUser = localStorage.getItem('username')
  }
  logout(){
    this.apiservice.logout();
  }

  getUser(email): void {
    this.userservice.getUserByEmail(email)
      .subscribe(
        user => {
          this.User = user;
          localStorage.setItem('username',this.User.userName)
        })
  }
}