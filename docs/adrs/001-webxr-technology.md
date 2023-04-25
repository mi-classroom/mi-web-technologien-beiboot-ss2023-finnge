# [ADR](./README.md) › Three.js als Framework für WebXR
<table>
<tr>
<th>status</th>
<td>proposed</td><!-- {proposed / rejected / accepted / deprecated / … / superseded by ADR-0005 <0005-example.md>} -->
</tr>
<tr>
<th>date</th>
<td>2023-04-18</td><!-- YYYY-MM-DD, when the decision was last updated -->
</tr>
<tr>
<th>deciders</th>
<td>Finn Gedrath</td><!-- list everyone involved in the decision -->
</tr>
</table>


## Kontext und Problemstellung

[WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals) ist eine Sammlung von standardisierten Browser-APIs, mit der Virtual Reality (VR) und Augmented Reality (AR) im Web umgesetzt werden können.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Entscheidungstreiber

* Ease-of-use
* Browser-Support
* Simplicity
* Documentation

## In Betracht gezogene Optionen

* Standard WebXR API mit WebGL
* A-Frame
* three.js

## Ergebnis der Entscheidung

Gewählte Option: "Three.js", weil es am besten ausfällt (siehe unten)}. Vorallem, da es eine sehr gute Dokumentation hat und die JavaScript API es ermöglicht die Funktionen gut kennen zu lernen. Werden die Szenen komplexer, kann es sinnvoll sein auf A-Frame zu wechseln.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
### Consequences

* 🟢 Gut, weil Abstraktion der WebGL API ermöglicht es uns, uns auf die Entwicklung der Anwendung zu konzentrieren.
* 🟢 Gut, weil ein Wechsel auf A-Frame gut möglich ist, wenn die Szenen komplexer werden.
* 🟡 Neutral, weil Abhängigkeit von einer Library entsteht.


<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Pro und Kontra der Optionen

### Standard WebXR API mit WebGL

* 🟢 Gut, weil standardisierte API kann besser verstanden werden.
* 🟢 Gut, weil standardisierte API ermöglicht es, die Technologie zu erweitern.
* 🔴 Schlecht, weil hohe Komplexität und selbst [offizielle WebXR Beispiele](https://github.com/immersive-web/webxr-samples/tree/main/js/render) mit Hilfe einer Library weg-abstrahiert werden.

### A-Frame

<https://aframe.io/docs/1.4.0/components/webxr.html>

* 🟢 Gut, weil Abstraktion der WebGL API
* 🟢 Gut, weil deklerative Szenenbeschreibung über Web-Componenten
* 🟢 Gut, weil viele Plugins bestehen, mit denen sich die Funktionalität erweitern lassen
* 🟢 Gut, weil WebXR and AR.js support besteht um tracking zu ermöglichen
* 🟢 Gut, weil A-Frame auf three.js aufbaut
* 🟡 Neutral, weil Abhänigkeit von einer Library

### three.js

<https://threejs.org/docs/>

* 🟢 Gut, weil Abstraktion der WebGL API
* 🟢 Gut, weil viele Plugins bestehen, mit denen sich die Funktionalität erweitern lassen
* 🟢 Gut, weil näher einer JS API als A-Frame
* 🟡 Neutral, weil setup vollständig in JS erfolgt

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Weitere Informationen

- [Alle WebXR Browser-APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API#specifications)