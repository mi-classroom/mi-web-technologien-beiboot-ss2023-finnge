import type { ComponentType, SvelteComponent } from "svelte";
import type { WebGLRenderer } from "three";

import { base } from "$app/paths";

import BergischerLoeweBahnhofBielstein from "@/components/scenes/bergischer-loewe-bahnhof-bielstein.svelte";

type ArExperience = {
  id: string;
  title: string;
  imagePath?: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  sceneComponent?: ComponentType<
    SvelteComponent<{
      canvasElement: HTMLCanvasElement;
      renderer: WebGLRenderer;
    }>
  >;
};

type ArPath = {
  id: string;
  title: string;
  backgroundImagePath?: string;
  arExperiences: ArExperience[];
};

export const paths: ArPath[] = [
  {
    title: "Wiehl",
    id: "wiehl",
    backgroundImagePath: base + "/images/bergisches_waldbroel-4351265.jpg",
    arExperiences: [
      {
        title: "Bergischer Löwe Bahnhof Bielstein",
        id: "bergischer-loewe-bahnhof-bielstein",
        geoLocation: {
          latitude: 50.96361581592383,
          longitude: 7.503346705784695,
        },
        sceneComponent: BergischerLoeweBahnhofBielstein,
      },
      {
        title: "Burghaus Bielstein",
        id: "burghaus-bielstein",
        geoLocation: {
          latitude: 50.96167839261665,
          longitude: 7.497174889774524,
        },
      },

      {
        title: "St. Bonifatius Kriegsgeschichte",
        id: "st-bonifatius-kriegsgeschichte",
        geoLocation: {
          latitude: 50.96292054689792,
          longitude: 7.49541172547757,
        },
      },
    ],
  },
  {
    title: "Straße der Arbeit – Marienheide",
    id: "strasse-der-arbeit-marienheide",
    backgroundImagePath: base + "/images/unnenbergturm.jpg",
    arExperiences: [
      {
        title: '"Straße der Arbeit" Steinbreche Weiershagen',
        id: "strasse-der-arbeit-steinbreche-weiershagen",
        geoLocation: {
          latitude: 50.97183894790319, // Koordinate ungewiss
          longitude: 7.489192933339773, // Koordinate ungewiss
        },
      },
      {
        title: "Eisenbahnbrücke an der Mühle",
        id: "eisenbahnbruecke-an-der-muehle",
        geoLocation: {
          latitude: 50.9486545809859,
          longitude: 7.552383734918755,
        },
      },
      {
        title: "Haus Kranenberg - Wohnzimmer von Bielstein/Brauerei",
        id: "haus-kranenberg-wohnzimmer-von-bielstein-brauerei",
        geoLocation: {
          latitude: 50.96290055325985,
          longitude: 7.502937145621412,
        },
      },
    ],
  },
  {
    title: "Wipperfürth",
    id: "wipperfuerth",
    backgroundImagePath: base + "/images/csm_DSC02989.jpg",
    arExperiences: [],
  },
];

export const data: ArExperience[] = paths.flatMap((path) =>
  path.arExperiences.map((arExperience) => ({
    ...arExperience,
    pathId: path.id,
  })),
);
