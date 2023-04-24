# Proof-of-Concepts

These proof-of-concepts are part of the [first Assignment](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-finnge/issues/2).

## Markerless Object Positioning

[Open in Browser](./hitbox-object.html)
[Open in Browser with Debug](./hitbox-object.html?eruda=true)

**Learnings:**

- Der Tracker braucht ein paar Sekunden, um den Raum zu erkennen
- Hitbox wird auf knapp 0° erkannt &rarr; Sehr flacher Erkennungs-Winkel
- Objekte vor simulierter Umgebung werden nicht erkannt
- Sehr gutes räumliches Tracking (auch bei schnellen Bewegungen). Distanz muss noch getestet werden.

## Marker based Object Positioning

[Open in Browser](./marker-object.html)
[Open in Browser with Debug](./marker-object.html?eruda=true)

**Learnings:**

 - Konnte leider nicht getestet werden, da Funktion nur auf Android-Geräten verfügbar ist


## Geo-based Object Positioning

[Open in Browser](./geo-object.html)
[Open in Browser with Debug](./geo-object.html?eruda=true)


- [ ] markerless object positioning
- [ ] marker based object positioning -> https://github.com/mrdoob/three.js/issues/22682
- [ ] geo-based object positioning
- [ ] markerless audio positioning
- [ ] marker based audio positioning
- [ ] geo-based audio positioning