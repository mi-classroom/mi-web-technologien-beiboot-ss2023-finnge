# [ADR](./README.md) › ESLint und Prettier als Linting-Tools

<table>
<tr>
<th>status</th>
<td>accepted</td><!-- {proposed / rejected / accepted / deprecated / … / superseded by ADR-0005 <0005-example.md>} -->
</tr>
<tr>
<th>date</th>
<td>2023-09-05</td><!-- YYYY-MM-DD, when the decision was last updated -->
</tr>
<tr>
<th>deciders</th>
<td>Finn Gedrath</td><!-- list everyone involved in the decision -->
</tr>
</table>


## Kontext und Problemstellung

Code wird mehr gelesen als geschrieben. Um diesen in einer lesbaren Struktur zu halten, muss ein externer Linter eingebaut werden. Dieser soll die Codequalität sicherstellen und die Lesbarkeit erhöhen.


## In Betracht gezogene Optionen

* ESLint
* Prettier

## Ergebnis der Entscheidung

Gewählte Option: ESLint mit Prettier, weil
Kombination der beiden Tools es ermöglicht JS und HTML zu linten + formatieren.

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
### Consequences

* 🟢 Gut, weil open source
* 🟢 Gut, weil einfach zu integrieren
* 🟡 Neutral, weil externe Abhängigkeit, die jedoch nur für Linting verwendet wird
* 🔴 Schlecht, weil mehrere Tools verwendet werden müssen, die unterschiedliche Konfigurationen benötigen und parallel geupdatet werden müssen

<!-- Dies ist ein optionales Element. Sie können es gerne entfernen. -->
## Weitere Informationen

* <https://prettier.io/>
* <https://eslint.org/>
* <https://github.com/prettier/eslint-plugin-prettier>
* <https://github.com/sveltejs/prettier-plugin-svelte>
* <https://github.com/prettier/eslint-plugin-prettier>
