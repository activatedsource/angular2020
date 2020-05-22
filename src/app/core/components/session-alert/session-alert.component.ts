import { Component, OnInit, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-session-alert',
  templateUrl: './session-alert.component.html',
  styleUrls: ['./session-alert.component.css']
})
export class SessionAlertComponent implements OnInit {

  warningDuration = 20;
  showLogout = false;
  countdown = 0;
  intervalSub: Subscription;

  constructor(private authSrv: AuthService) {
  }

  ngOnInit() {
    this.intervalSub = interval(1000)
      .pipe(
        take(this.warningDuration)
      ).subscribe(
        (value) => {
          this.countdown = this.warningDuration - (value + 1);
          console.log('> ' + this.countdown);
          if (value === (this.warningDuration - 1)) {
            console.log('AUTO TRIGGERED');
            this.authSrv.logout(true);
          }
        }
      );
  }

  handleLogin() {
    this.intervalSub.unsubscribe();
    this.authSrv.logout(true);
  }

  handleLogout() {
    this.intervalSub.unsubscribe();
    this.authSrv.logout(true);
  }

}
