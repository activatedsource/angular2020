import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStoreService } from '../auth/data-store.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string;
  isAuthenticated = false;
  userSubcription: Subscription;
  constructor(
    private router: Router,
    private dataSoreSrv: DataStoreService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.userSubcription = this.authSrv.user$.subscribe(
      (user: User) => {
        //console.log('>>>>Header user', user);
        this.isAuthenticated = !!user;
        this.userName = user ? user.email : '';
      }
    );
  }

  navHome() {
    this.router.navigate(['/']);
  }

  getRecipeRoute() {
    return ['recipe'];
  }

  saveHandler() {
    this.dataSoreSrv.saveDataStore();
  }

  fetchHandler() {
    this.dataSoreSrv.fetchDataStore();
  }

  logoutHandler() {
    this.authSrv.logout();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

}
