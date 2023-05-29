# Proof-of-Concepts

These proof-of-concepts are part of the [first Assignment](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-finnge/issues/2).

## Markerless Object Positioning

[Open in Browser](./hitbox-object.html) <br>
[Open in Browser with Debug](./hitbox-object.html?eruda=true)

**Learnings:**

- Der Tracker braucht ein paar Sekunden, um den Raum zu erkennen
- Hitbox wird auf knapp 0° erkannt &rarr; Sehr flacher Erkennungs-Winkel
- Objekte vor simulierter Umgebung werden nicht erkannt
- Sehr gutes räumliches Tracking (auch bei schnellen Bewegungen). Distanz muss noch getestet werden.
- Bei dunklen Lichtverhältnissen wird das Tracking schlechter
- Positionierung von 3D Objekten ist auf ca. 8-10 m möglich (über das Fadenkreuz)

## Marker based Object Positioning

[Open in Browser](./marker-object.html) <br>
[Open in Browser with Debug](./marker-object.html?eruda=true)

**Learnings:**

 - Konnte leider nicht getestet werden, da Funktion nur auf Android-Geräten verfügbar ist


## Geo-based Object Positioning

[Open in Browser](./geo-object.html) <br>
[Open in Browser with Debug](./geo-object.html?eruda=true)


**Learnings:**

- Genauigkeit der GPS Positionierung ist auf 5 m beschränkt. Positionierung von 3D Objekten ist damit nicht möglich.
- Positioneriung genauso wie bei Markerless Object Positioning
- Bei schlechten GPS Signalen wird das Tracking (Enter of Boundingbox) schlechter
- GPS Positionering funktioniert draußen besser als in geschlossenen Räumen


## Markerless Audio Positioning

[Open in Browser](./hitbox-audio.html) <br>
[Open in Browser with Debug](./hitbox-audio.html?eruda=true)

**Learnings:**

- Positionierung funktioniert wie bei Markerless Object Positioning
- Breite des Audio-Ausschlags kann recht genau spezifiziert werden
- Audio wird leicht leiser, wenn sich vom Zentrum des Ausschlags entfernt bzw. weggewendet wird
- Audio wird signifikant leiser, wenn sich hinter das Objekt bewegt wird


## Interact with Cube to play Audio

[Open in Browser](./interaction-play-music.html) <br>
[Open in Browser with Debug](./interaction-play-music.html?eruda=true)

**Learnings:**

- Audio wird abgespielt, wenn der Würfel berührt wird