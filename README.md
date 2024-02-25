# MiniCart-Admin

MiniCart-Admin ist ein einfache gehaltener Webshop mit grundlegenden Shop-Funktionen.
Die App wurde in Angular 17.0.9 erstellt, die [Api](https://github.com/almirhodzic/minicart-server) mit Laravel.<br><br>

## Demo-Shop

Mit folgendem Link kannst du den Demo-Shop besuchen: [https://minicart.ch](https://minicart.ch)<br><br>

## Initial Setup

Ins Verzeichnis der App navigieren und `nmp i` oder `nmp install` ausführen. Die App wird somit installiert.<br><br>

## Development server

Um die App zu starten, folgenden Befehl ausführen: `ng serve` oder `ng s`  
Die App kannst du unter: http://localhost:4200 aufrufen.<br><br>

## App Build

Um die App zu builden, musst du folgenden Befehl ausführen: `ng build`  
Der build wird im Verzeichnis `dist/frontend` erstellt, welche du auf deinem Server deployen darfst.<br><br>

## Api-Server

Diese App benötigt eine Api Schnittstelle. Diese wurde in Laravel geschrieben und kann [hier](https://github.com/almirhodzic/minicart-server) heruntergelaen werden.<br><br>

## Unit Test

Für den Unit Test mit [Karma](https://karma-runner.github.io/latest/index.html), führe folgenden Befehl aus: `ng test`<br><br>

## e2e Test
npm run cypress:open<br><br>

## Hinweise

Du darfst auf Eigenes Risiko, den MiniCart-Server [(Api)](https://github.com/almirhodzic/minicart-server) auf deinem Host installieren und betreiben.  
Der Betrieb der Api geschieht auf Eigenes Risiko & Eigene Verantwortung!