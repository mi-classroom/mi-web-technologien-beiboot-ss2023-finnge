type ArExperience = {
  id: string;
  title: string;
  imagePath?: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
};

export const data: ArExperience[] = [
  {
    title: "Bergischer Löwe Bahnhof Bielstein",
    id: "bergischer-loewe-bahnhof-bielstein",
    geoLocation: {
      latitude: 50.96361581592383,
      longitude: 7.503346705784695,
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
  {
    title: "Burghaus Bielstein",
    id: "burghaus-bielstein",
    geoLocation: {
      latitude: 50.96167839261665,
      longitude: 7.497174889774524,
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
    title: '"Straße der Arbeit" Steinbreche Weiershagen',
    id: "strasse-der-arbeit-steinbreche-weiershagen",
    geoLocation: {
      latitude: 50.97183894790319, // Koordinate ungewiss
      longitude: 7.489192933339773, // Koordinate ungewiss
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
];
