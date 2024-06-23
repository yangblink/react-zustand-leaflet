import { MultiPolygon, FeatureCollection } from 'geojson';
import geoJSON from '@/data/zhejiang.json'
import * as turf from '@turf/turf';
import L from 'leaflet'
import { useZustandMap} from '@/store/mapStore'

let geoData: FeatureCollection<MultiPolygon> = geoJSON as FeatureCollection<MultiPolygon>

export default function MapPage () {

  const mapRef = useZustandMap((state) => state.map)
  const map = mapRef?.map as L.Map

  console.log('map page init...', mapRef)

  function addLayer() {
    console.log('add layer')

    geoData.features.forEach(geo => {
      let center = turf.center(geo)

      if (geo.geometry.coordinates.length > 1) {
        let areas = []
        geo.geometry.coordinates.forEach(polygon => {
          let pol = turf.polygon(polygon)
          let area = turf.area(pol)
          areas.push({ area, pol })
        })
        areas.sort((a, b) => b.area -a.area)
        center = turf.center(areas[0].pol)
      }

      let [jd, wd] = geo.properties.center
      addTitle(wd, jd, geo.properties.name, map)

      L.geoJSON(geo, {
        style: function (feature) {
          return {
            color: getRandomHexColor(),
            weight: 2
          }
        }
      }).addTo(map)
    })
  }
  function addTitle(wd: number, jd: number, text: string, map: L.Map) {
    var customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='font-size: 12px;'>${text}</div>`,
        iconSize: [100, 40],
        iconAnchor: [50, 20]
    });

    var customMarker = L.marker([wd, jd], {
        icon: customIcon
    }).addTo(map);
  }

  function getRandomHexColor(): string {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  return <>
    <div>
      <button onClick={addLayer}>添加图层</button>
    </div>
  </>
}