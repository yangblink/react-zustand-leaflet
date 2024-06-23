import { create } from 'zustand'
import L from 'leaflet'

interface ZustandMap {
  bears: number;
  map: L.Map | null,
  setMap: (val: L.Map) => void;
}
export const useZustandMap = create<ZustandMap>((set) => ({
  map: null,
  bears: 0,
  setMap: (val) => set(() => ({ map: val }))
}))
