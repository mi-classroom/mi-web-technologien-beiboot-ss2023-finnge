# Dokumentation für die Demoanwendung

In der Aufgabe 4 wurden die Ergebnisse der Aufgaben 1-3 in eine Demoanwendung integriert. Diese Dokumentation beschreibt die Funktionsweise der Demoanwendung und die Möglichkeiten zur Erweiterung. Unterteilt wird die Dokumentation in die jeweiligen Anwendungsobjekte:

* [Intro](#intro)
* [ARlebnis-Pfade Wahl](#arlebnis-pfade-wahl)
* [ARlebnisse in der Nähe](#arlebnisse-in-der-nähe)
* [ARlebnis über QR-Code starten](#arlebnis-über-qr-code-starten)
* [Ein ARlebnis starten](#ein-arlebnis-starten)
* [Datenhaltung für ARlebnisse und Pfade](#datenhaltung-für-arlebnisse-und-pfade)

## Intro

* **Implementierte Funktionen:** Willkommens-Video / Navigations-Auswahl
* **Anpassungen:** Das Video startet erst, nach einer Nutzerinteraktion: "Einführung beginnen". Autoplay ist in den meisten Browsern nur nach Interaktion erlaubt (siehe <https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability>)
* **Fehlende Funktionen:** Keine

## ARlebnis-Pfade Wahl

* **Implementiert Funktionen:** Dynamische Übersicht über Pfade (siehe auch [Abschn. Datenhaltung](#datenhaltung-für-arlebnisse-und-pfade))
* **Anpassungen:** Keine
* **Fehlende Funktionen:** Die Pfade sind noch nicht mit der Karte verknüpft. Die Pfade können noch nicht gestartet werden.

## ARlebnisse in der Nähe

* **Implementiert Funktionen:** Dynamische Übersicht über ARlebnisse in der Nähe (siehe auch [Abschn. Datenhaltung](#datenhaltung-für-arlebnisse-und-pfade))
* **Anpassungen:** Live Entfernungsberechnung der ARlebnisse in der Nähe / Sortierung nach Entfernung / Starten der ARlebnisse über Klick auf den Eintrag
* **Fehlende Funktionen:** Keine

## ARlebnis über QR-Code starten

* **Implementiert Funktionen:** keine
* **Anpassungen:** Keine
* **Fehlende Funktionen:** QR-Code Scanner

## Ein ARlebnis starten

* **Implementiert Funktionen:** Starten eines spezifischen ARlebnisses
* **Anpassungen:** Anzeige der Live-Entfernung zum ARlebnis
* **Fehlende Funktionen:** Keine

## Datenhaltung für ARlebnisse und Pfade

Alle ARlebnisse werden strukturiert nach Pfaden organisiert. Ein Pfad besteht aus mehreren ARlebnissen. Die Datenhaltung ist in der Datei `src/_data/arExperiences.ts` implementiert. Das Konstrukt speichert auch Meta-Informationen wie Titel, Beschreibung und Bild für die Übersichtsseiten. So können ARlebnisse dynamisch in der Anwendung dargestellt werden.

Die Szene als solches wird als SvelteComponent angelegt und in `src/components/scenes/` definiert. Sie wird dynamisch in der Anwendung geladen und gestartet. Allgemein-gültige Funktionen werden in `src/components/scenes/common.ts` definiert.
