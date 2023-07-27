# [ADR](./README.md) › SvelteKit als Static Site Generator

<table>
<tr>
<th>status</th>
<td>accepted</td><!-- {proposed / rejected / accepted / deprecated / … / superseded by ADR-0005 <0005-example.md>} -->
</tr>
<tr>
<th>date</th>
<td>2023-07-26</td><!-- YYYY-MM-DD, when the decision was last updated -->
</tr>
<tr>
<th>deciders</th>
<td>Finn Gedrath</td><!-- list everyone involved in the decision -->
</tr>
</table>


## Kontext und Problemstellung

Für [Aufgabe 4](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/4) soll eine Demo-Anwendung mit hoher Interaktivität erstellt werden. Damit dieser PoC möglichst schnell umgesetzt werden kann, soll ein Framework verwendet werden, das die Entwicklung beschleunigt. Die Anwendung soll als statische Webseite ausgeliefert werden, um die Kosten für den Betrieb möglichst gering zu halten und es mit GitHub Pages (siehe [ADR-002](./002-deployment-github-pages.md)) zu hosten.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Entscheidungstreiber

* Entwicklungsgeschwindigkeit (aufgrund von Vorwissen, Tooling, ...)
* Funktionsumfang (z.B. SSR, SSG, Routing, ...)
* Performance (z.B. Ladezeit, ...)

## In Betracht gezogene Optionen

* Svelte mit SvelteKit
* Eleventy
* Vue mit Nuxt

## Ergebnis der Entscheidung

Gewählte Option: "SvelteKit".

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Pro und Kontra der Optionen

### Svelte mit SvelteKit

* 🟢 Gut, weil hohe Reaktivität
* 🟢 Gut, weil Struktur in Komponenten
* 🟢 Gut, weil geringer Boilerplate-Code beim Aufbau der Komponenten
* 🟢 Gut, weil geringer Footprint beim Ausliefern der Anwendung
* 🟡 Neutral, weil relativ neue Technologie

### Eleventy

{Beispiel / Beschreibung / Verweis auf weitere Informationen / ...}

* 🟢 Gut, weil hohe Anpassbarkeit
* 🟢 Gut, weil Code agnostisch bleibt
* 🟡 Neutral, weil keine frontend-seitige Reaktivität


### Vue mit Nuxt

{Beispiel / Beschreibung / Verweis auf weitere Informationen / ...}

* 🟢 Gut, weil Strukturierung der Anwendung
* 🟢 Gut, weil gute Dokumentation
* 🟢 Gut, weil Aufbau von interaktiven Komponenten
* 🟡 Neutral, weil geringe Erfahrungswerte
