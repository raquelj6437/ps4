import { Component } from '@angular/core';
import weather from './weather.json';

// interface Weather {  
//   location: Location;
//   current: Location;  
// }  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tour-of-heroes';

  weathers = weather;
  showgames = false;
  buttonClick() {
    this.showgames = !this.showgames;
  }
}
