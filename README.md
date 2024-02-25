# MiniCart-Admin

MiniCart-Admin ist ein Webshop der Allerlei verkauft. Es gibt einen Admin- und einen Benutzerbereich.  
Die App wurde in Angular 17.0.9 geschrieben.

## Demo-Shop

Du kannst den Demo-Shop hier besuchen: [https://minicart.ch](https://minicart.ch)

## Initial Setup

Im App-Verzeichnis zuerst Abhängigkeiten installieren: `nmp i` oder `nmp install`.

## Development server

Um den Entwicklungsserver zu starten, folgenden Befehl ausführen:`ng serve` oder `ng s`.  
Öffne im Browser die Url http://localhost:4200/. Die App wird automatisch gestartet.

## App Build

Um die App zu builden folgenden Befehl ausführen: `ng build`.

## Api-Server

Diese App funktioniert im Development modus nur mit einer lokalen Laravel-Api die Du hier [(MiniCart-Server)](https://github.com/almirhodzic/minicart-server) zeiehen kannst. Für diese Installation, solltest Laravel-Basiswissen haben.

## Unit Test

Für den Unit Test mit [Karma](https://karma-runner.github.io/latest/index.html), führe folgenden Befehl aus: `ng test`

## e2e Test
npm run cypress:open
