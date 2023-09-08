export type GeoPoint = {
  latitude: number;
  longitude: number;
};

/**
 * Constant for the earth radius in metres.
 */
const EARTH_RADIUS = 6371e3;

/**
 * Returns the distance between two points in metres.
 * @see https://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {GeoPoint} point1
 * @param {GeoPoint} point2
 * @returns {number} distance in metres
 */
export function distance(point1: GeoPoint, point2: GeoPoint): number {
  const φ1 = (point1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = EARTH_RADIUS * c; // in metres

  return d;
}

/**
 * Returns a distance in a nice format. If the distance is less than 1000m,
 * it will be returned in metres. Otherwise it will be returned in kilometers.
 *
 * @param {GeoPoint} point1
 * @param {GeoPoint} point2
 * @returns {string} distance in metres or kilometers
 */
export function niceDistance(point1: GeoPoint, point2: GeoPoint): string {
  const distanceInMeters = distance(point1, point2);

  if (distanceInMeters < 1000) {
    return formatMeters.format(distanceInMeters);
  }

  const distanceInKm = distanceInMeters / 1000;
  return formatKilometers.format(distanceInKm);
}

const formatKilometers = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 1,
  style: "unit",
  unit: "kilometer",
});

const formatMeters = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
  style: "unit",
  unit: "meter",
});
