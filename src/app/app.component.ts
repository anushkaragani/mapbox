import { environment } from '../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map: mapboxgl.Map  ;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 23.87668;
  lng = 71.3576;
  geocoder: any;
  address: string;
  long: any;
  latitude: any;

  constructor() {
    mapboxgl.accessToken = environment.mapboxKey;
  }


  ngOnInit() {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 6,
        center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.geocoding();
  }

  geocoding() {
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      // countries: 'us',
      // filter: function (item) {
      //   return item.context
      //   .map(function (i) {
      //   return (
      //   i.id.split('.').shift() === 'region' &&
      //   i.text === 'California'
      //   );
      //   })
      //   .reduce(function (acc, cur) {
      //   return acc || cur;
      //   });
      //   },
      mapboxgl: mapboxgl
      });
      document.getElementById('demo')!.appendChild(this.geocoder.onAdd(this.map));
      this.getAddress();
  }

  getAddress(){
    this.geocoder.on('result', (e) => {
      console.log(e.result);

      this.address = e.result.place_name;
      this.long = e.result.geometry.coordinates[0];
      this.latitude = e.result.geometry.coordinates[1];
    })
  }
}
