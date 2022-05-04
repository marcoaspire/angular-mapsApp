import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      .map2{
        position: absolute; top: 0; bottom: 0; width: 100%;
      }

      .map-container{
        position: absolute; top: 0; bottom: 0; width: 100%;
      }
    `
  ]
})
export class FullScreenComponent implements AfterViewInit {

  @ViewChild('map') divMap!:ElementRef;
  map!:mapboxgl.Map;
  zoomLevel: number =15;
  center: [number,number] = [ -5.5699,42.6028];

  constructor() { }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
      });

  }


}
