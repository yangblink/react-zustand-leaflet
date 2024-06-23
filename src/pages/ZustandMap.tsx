import { useZustandMap } from '@/store/mapStore'
import { useRef, useEffect } from 'react'
import L from 'leaflet';

export default function ZustandMap() {
  const map = useZustandMap((state) => state.map)
  const setMap = useZustandMap((state) => state.setMap)

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // console.log('init leaflet map')
      mapRef.current = L.map(mapContainerRef.current, {
        center: [28.16, 121.4],
        // zoom: 14, //缩放比列
        zoom: 7, //缩放比列
        zoomControl: true, //禁用 + - 按钮
        doubleClickZoom: true, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
      })
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
      ).addTo(mapRef.current)

      // console.log('🚀 ~ useEffect ~ mapRef:', mapRef)
      // setMap({ map: mapRef.current })
      setMap(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <>
    <div ref={mapContainerRef} style={{ height: '80vh', width: '100%' }} />
  </>
}