# MiniCart-Admin

MiniCart-Admin ist ein einfache gehaltener Webshop mit grundlegenden Shop-Funktionen.
Die App wurde in Angular 17.0.9 erstellt, die [Api](https://github.com/almirhodzic/minicart-server) mit Laravel.<br><br>

## Initial Setup

1. MiniCart-Admin Repo klonen: `git clone https://github.com/almirhodzic/minicart-admin`<br>
2. Zum Verzeichnis wechseln: `cd minicart-admin`
3. Jetzt `nmp i` oder `nmp install` ausführen um die App zu installieren.<br><br>

## App starten

Um die App zu starten, folgenden Befehl ausführen: `ng serve` oder `ng s`  
Die App ist unter: http://localhost:4200 erreichbar.<br><br>

## Api-Server

Diese App benötigt eine Api Schnittstelle. Diese wurde in Laravel geschrieben und kann [hier](https://github.com/almirhodzic/minicart-server) heruntergelaen werden.
Du kannst diesen Server lokal bei dir installieren, vorausgesetzt du hast PHP auf deinem Rechner installiert und bist einigermassen mit Laravel vertraut.<br><br>

## App Build

Du kannst die App gerne builden `ng build` und auf deinem Server deployen.
Der build wird im Verzeichnis `dist/frontend` erstellt, welche du auf deinem Server deployen darfst.<br><br>

## Demo-Shop

Diesen Demo-Shop kannst Du hier besuchen: [https://minicart.ch](https://minicart.ch)<br><br>

## Unit Test

Für den Unit Test mit [Karma](https://karma-runner.github.io/latest/index.html), führe folgenden Befehl aus: `ng test`<br><br>

## e2e Test
npm run cypress:open<br><br>

## Hinweise

Du darfst auf Eigenes Risiko, den MiniCart-Server [(Api)](https://github.com/almirhodzic/minicart-server) auf deinem Host installieren und betreiben.  
Der Betrieb der Api geschieht auf Eigenes Risiko & Eigene Verantwortung!