[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10785596&assignment_repo_type=AssignmentRepo)

# Web Technologien // begleitendes Projekt Sommersemester 2023

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Erprobung von Augmented Reality im Browser. Das wird toll!

## Inhaltsverzeichnis

- [Proof-of-Concepts](./proof-of-concepts/README.md)
- [ADRs](./docs/adrs/README.md)
- [Zeitaufwände](./docs/zeitaufwand.md)
- [Review Process](./docs/review-process.md)

## Befehle für die Proof-of-Concepts

| Befehl | Beschreibung |
| --- | --- |
| `make up` | Startet die Docker Container |
| `make down` | Stoppt die Docker Container |
| `make restart` | Started die Docker Container neu |
| `make logs` | Zeigt die Logs der Docker Container an |
| `make tunnel` | Startet einen Tunnel zu localhost:6066 |
| `make dev` | Startet ein dev Umgebung außerhalb von Docker |

## Aufgabe 4: Basis-App Anwendung

In der Basis-App anwendung wurden die in den PoCs entwickelten AR-Anwendungen in einen Applikations-Kontext gestellt. In [ADR-004](./docs/adrs/004-sveltekit.md) wurde sich dafür entschieden diese mit SvelteKit umzusetzen. Die Basis Anwendung ist über <<https://mi-classroom.github.io/mi-web-technologien-beiboot-ss2023-finnge> erreichbar.

Es wurden mehrere AR-Anwendungen implementiert. Über die folgenden QR-Codes, die in den Erlebnis-Pfaden ausliegen könnten, wird eine AR-Anwendung gestartet.

| QR-Code | Beschreibung |
| --- | --- |
| ![QR-Code](./docs/images/qr-codes/bergischer-loewe-bahnhof-bielstein.png) | **Bergische Löwe Bahnhof Bielstein** \ Spatial Sound mit einem Zylinder. |
| ![QR-Code](./docs/images/qr-codes/burghaus-bielstein.png) | **Burghaus Bielstein** \ Spatial Sound mit zwei Zylindern. Der Sound kann einzeln an und aus geschaltet werden. |
| ![QR-Code](./docs/images/qr-codes/st-bonifatius-kriegsgeschichte.png) | **St. Bonifatius Kriegsgeschichte** \ Platzierung eines Pfades mit Hilfe von Knoten und Linien. |
| ![QR-Code](./docs/images/qr-codes/strasse-der-arbeit-steinbreche-weiershagen.png) | **"Straße der Arbeit" Steinbreche Weiershagen** \ 3D-Video mit Interaktionsmöglichkeit zum Starten und Stoppen. |
