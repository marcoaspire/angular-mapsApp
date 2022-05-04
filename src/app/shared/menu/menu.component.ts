import { Component, OnInit } from '@angular/core';

interface MenuItem{
  path: string;
  text: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menu: MenuItem[] = [
    { path: 'maps/fullscreen', text: 'Fullscreen2' },
    { path: 'maps/zoomrange', text: 'Zoomrange' },
    { path: 'maps/markers', text: 'Markers' },
    { path: 'maps/properties', text: 'Properties' }

  ];


}
