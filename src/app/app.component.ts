import { Component, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themeSubject$: Subject<{previous: string, next: string}> = new Subject();
  currentTheme: string = 'light';
  title = 'skinworld-app';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.onThemeChange()
    .subscribe(({previous, next}) => {
      const body = document.body;
      if(previous) {
        this.renderer.removeClass(body, `sw-theme-${previous}`);
      }
      this.renderer.addClass(body, `sw-theme-${next}`);
    })
  }

  changeTheme(theme: string) {
    this.themeSubject$.next({previous: this.currentTheme, next: theme});
  }

  onThemeChange() {
    return this.themeSubject$.pipe(
      tap(({next}) => this.currentTheme = next),
      share()
    );
  }
}
