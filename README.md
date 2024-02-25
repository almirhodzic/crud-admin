# MiniCart-Admin

MiniCart-Admin ist ein einfach gehaltener Webshop mit wesentlichen Shopfunktionen.<br>
Die App wurde in Angular 17.0.9 erstellt, die [API](https://github.com/almirhodzic/minicart-server) mit Laravel.<br><br>

## Initial Setup

1. MiniCart-Admin Repo klonen: `git clone https://github.com/almirhodzic/minicart-admin`<br>
2. Zum Verzeichnis wechseln: `cd minicart-admin`
3. Jetzt `nmp i` oder `nmp install` ausführen um die App zu installieren.<br><br>

## App starten

Um die App zu starten, folgenden Befehl ausführen: `ng serve` oder `ng s`  
Die App ist unter: http://localhost:4200 erreichbar. (Bitte nachfolgenden Abschnitt [API-Server] beachten)<br><br>

## API-Server

Diese App benötigt eine API-Schnittstelle. Diese wurde in Laravel geschrieben und kann [hier](https://github.com/almirhodzic/minicart-server) heruntergeladen werden.
Du kannst diesen Server lokal bei dir installieren, vorausgesetzt du hast PHP auf deinem Rechner installiert und bist einigermassen mit Laravel vertraut.<br><br>

## App Build

Du kannst die App auch gerne builden `ng build` und auf deinem Server deployen.<br>
Den build findest Du im Verzeichnis `minicart-admin/dist/frontend`<br><br>

## Demo-Shop

MiniCart-Admin [online-Demo](https://minicart.ch)<br><br>

## Unit Test

Für den Unit Test mit [Karma](https://karma-runner.github.io/latest/index.html), führe folgenden Befehl aus: `ng test`<br><br>

## e2e Test
Für den e2e Test mit [Cypress](https://www.cypress.io/) führe diesen Befehl aus: `npm run cypress:open`<br><br>

## Hinweise

Du darfst den MiniCart-Server [(API)](https://github.com/almirhodzic/minicart-server) auf deinem Host installieren und betreiben.  
Der Betrieb des Servers erfolgt auf eigenes Risiko & eigene Verantwortung!