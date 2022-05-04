import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container{
        position: absolute; top: 0; bottom: 0; width: 100%;
      }
      .row{
        background-color:white;
        bottom:50px;
        left:50px;
        position:fixed;
        z-index:9999;
        width: 300px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {

  @ViewChild('map') divMap!:ElementRef;
  map!:mapboxgl.Map;
  zoomLevel: number =15;
  center: [number,number] = [ -5.5699,42.6028];


  constructor() {

    console.log('constructoe'+this.divMap);

  }
  ngOnDestroy(): void {
    //remove listeners
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }
  ngAfterViewInit(): void {
    console.log('onInit'+this.divMap);

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
      });

      //create a listener
      this.map.on('zoom', (e) => {
        this.zoomLevel=this.map.getZoom();
      });

      this.map.on('zoomend', (e) => {
        if (this.map.getZoom()> 18)
        {
           this.map.zoomTo(18);
        }
      });

      //map
      this.map.on('move', (e)=> {
        const target=e.target;
        const {lng,lat} = target.getCenter();
        this.center = [lng,lat];

      });

  }

  zoomChange(value:string){
    console.log(value);
    this.map.zoomTo(Number(value));
  }
  zoomIn(){
    console.log('zoomIn');
    this.map.zoomIn();
  }

  zoomOut(){
    console.log('zoomOut');
    this.map.zoomOut();

  }





}
