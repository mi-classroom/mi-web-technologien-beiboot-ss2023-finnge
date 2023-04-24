# [ADR](./README.md) › Debugging mit eruda.js

<table>
<tr>
<th>status</th>
<td>accepted</td><!-- {proposed / rejected / accepted / deprecated / … / superseded by ADR-0005 <0005-example.md>} -->
</tr>
<tr>
<th>date</th>
<td>2023-04-24</td><!-- YYYY-MM-DD, when the decision was last updated -->
</tr>
<tr>
<th>deciders</th>
<td>Finn Gedrath</td><!-- list everyone involved in the decision -->
</tr>
</table>


## Kontext und Problemstellung

Bei Fehlern muss die Möglichkeit bestehen, diese zu debuggen.


## In Betracht gezogene Optionen

* Debugging am Desktop
* Debugging über einen verbundenen Browser (-> Firefox)
* Debuugin über ein externes Tool eruda.js

## Ergebnis der Entscheidung

Gewählte Option: "eruda.js", weil
eruda die einzige Möglichkeit ist, die es ermöglicht, die Konsole auf dem Smartphone zu debuggen. Debugging auf dem Desktop ist nicht möglich, da WebXR hier nicht lauffähig ist. Die Verbindung über den Firefox Browser ist nicht möglich, da kein Android Gerät zur Verfügung steht.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
### Consequences

* 🟢 Gut, weil open-source Tool
* 🟢 Gut, weil einfach zu integrieren
* 🟡 Neutral, weil nicht alle Funktionen der Konsole verfügbar sind
* 🟡 Neutral, weil externe Abhängigkeit, die jedoch nur für Debugging verwendet wird