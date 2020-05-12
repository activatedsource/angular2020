import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { SessionAlertComponent } from './auth/alert/session-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular2020';
  @ViewChild(PlaceholderDirective, { static: true }) holder: PlaceholderDirective;

  constructor(
    private authSrv: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    console.log('COMPONENT - AppComponent');
  }

  ngOnInit(): void {

    this.authSrv.autoLogin();

    this.authSrv.showLogoutWarning$.subscribe(
      (value: { show: boolean, time: number }) => {
        // console.log(' SHOWING...  : ', value);
        if (value.show) {
          this.showSessionWarning(value.time);
        } else {
          this.hideSessionWarning();
        }
      }
    );

  }

  showSessionWarning(time: number) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SessionAlertComponent);
    this.holder.vcf.clear();
    const compRef: ComponentRef<SessionAlertComponent> = this.holder.vcf.createComponent(factory);
    compRef.instance.warningDuration = time;
  }

  hideSessionWarning() {
    this.holder.vcf.clear();
  }


}
