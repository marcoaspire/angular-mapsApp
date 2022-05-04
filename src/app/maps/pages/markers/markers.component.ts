import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor{
  color:string;
  marker?:mapboxgl.Marker;
  center?:[number,number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container{
        position: absolute; top: 0; bottom: 0; width: 100%;
      }

      .list-group{
        position: fixed;
        top:20px;
        right:20px;
        z-index:999;
      }

      li{
        cursor:pointer;
      }




    `
  ]
})
export class MarkersComponent implements AfterViewInit {
  @ViewChild('map') divMap!:ElementRef;
  map!:mapboxgl.Map;
  zoomLevel: number =15;
  center: [number,number] = [ -5.5699,42.6028];

  //markersArray:mapboxgl.Marker[] = []
  markersArray:MarkerColor[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });
    this.readLocalStorage();


    // const markerHTML:HTMLElement = document.createElement('div');
    // markerHTML.innerHTML= 'Hello world';

    // const marker = new mapboxgl.Marker(
    //     //{element: markerHTML}
    //   )
    //   .setLngLat(this.center).addTo(this.map);


  }

  addMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker( {draggable:true,color})
     .setLngLat(this.center).addTo(this.map);


    this.markersArray.push(
      {
        color,
        marker:newMarker
      }
    );
    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    });

    this.saveMarkersLocalStorage();
  }

  goToMarker(marker:mapboxgl.Marker | undefined){


    this.map.flyTo(
      {
        center: marker!.getLngLat()
      }
    );
  }

  saveMarkersLocalStorage(){
    const lnglat:MarkerColor[]=[];

    this.markersArray.forEach(m =>{
      const color=m.color;
      const {lng,lat}=m.marker!.getLngLat();
      lnglat.push(
        {
          color,
          center: [lng,lat]
        }
      );
      localStorage.setItem('markers',JSON.stringify(lnglat));

    });
  }

  readLocalStorage(){
    if (!localStorage.getItem('markers'))
    {
      return;
    }
    const lnglat:MarkerColor[]=JSON.parse(localStorage.getItem('markers')!);
    console.log(lnglat);

    lnglat.forEach(m => {
      const newMarker =new mapboxgl.Marker( {draggable:true,color:m.color})
      .setLngLat(m.center!).addTo(this.map);
      this.markersArray.push( { marker: newMarker, color: m.color} );

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      });


    });



  }
  deleteMarker(i:number){
    console.log(i);
    this.markersArray[i].marker?.remove();
    this.markersArray.splice(1,i);
    this.saveMarkersLocalStorage();
  }

}
