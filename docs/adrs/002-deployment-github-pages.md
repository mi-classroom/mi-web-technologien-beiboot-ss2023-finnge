# [ADR](./README.md) › Deployment auf GitHub Pages

<table>
<tr>
<th>status</th>
<td></td><!-- {proposed / rejected / accepted / deprecated / … / superseded by ADR-0005 <0005-example.md>} -->
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

WebXR muss über HTTPS bereitgestellt werden.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Entscheidungstreiber

* Kosten
* Ease-of-Use

## In Betracht gezogene Optionen

* GitHub Pages
* Manuelle Konfiguration eines Web-Servers

## Ergebnis der Entscheidung

Gewählte Option: "GitHub Pages", weil
einfachste und bekanntes Tool, um Code über HTTPS frei zu deployen. Ein Wechsel ist trotzdem jeder Zeit möglich.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
### Consequences

* 🟢 Gut, weil frei verfügbar
* 🟢 Gut, weil Technologie nur front-end-seitig verwendet wird
* 🟢 Gut, weil Wechsel auf anderen Server-Provider als Fallback gut möglich ist.