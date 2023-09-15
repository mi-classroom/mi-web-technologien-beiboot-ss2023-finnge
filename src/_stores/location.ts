import { writable } from "svelte/store";
import type { GeoPoint } from "@/utils/geoCoords";

export const currentLocation = writable({
  latitude: 0,
  longitude: 0,
} satisfies GeoPoint);
export const hasLiveLocation = writable(false);

let watchId: number | null = null;

export function startLocationWatch() {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by your browser");
    return;
  }

  if (watchId) {
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      hasLiveLocation.set(true);
      currentLocation.set({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    },
  );
}

export function stopLocationWatch() {
  if (!watchId) {
    return;
  }
  navigator.geolocation.clearWatch(watchId);
  hasLiveLocation.set(false);
  watchId = null;
}

export function isWatching() {
  return watchId !== null;
}
