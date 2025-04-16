# FED24D API Inlämning 1 - API-utveckling och databasnormalisering

## Beskrivning
Detta projekt innehåller en Express-baserad API för en produktkatalog i en e-shop. API:et är kopplat till en normaliserad MySQL-databas och hanterar produkter och tillhörande kategorier. Uppgiften omfattar att bygga ett ER-diagram, skapa och normalisera databasen samt implementera ett API som kan hantera produkter och kategorier.

### Funktioner:
- **Normaliserad databas**: Produkten och kategorierna lagras i separata tabeller med korrekta främmande och primära nycklar.
- **Express API**: Ett API som tillhandahåller CRUD-funktioner för produkter och kategorier.
- **Testdata**: Testdata har lagts till i databasen för att underlätta tester av API-funktionaliteten.

## Innehåll:
- ER-diagram
- SQL-fil för databasstruktur och testdata
- Express API (CRUD-funktioner för `products` och `categories`)

## API-endpoints:
   - `GET /products` – Hämta alla produkter
   - `GET /products/:id` – Hämta produkt baserat på ID
   - `POST /products` – Skapa en ny produkt
   - `PUT /products/:id` – Uppdatera en produkt
   - `DELETE /products/:id` – Ta bort en produkt
   - `GET /categories` – Hämta alla kategorier
   - `GET /categories/:id` – Hämta kategori baserat på ID

## Användning
API:et kan användas för att skapa, uppdatera, hämta och ta bort produkter samt kategorier i en e-shop. Testdata finns tillgänglig för att verifiera att API:et fungerar korrekt.

## Test
För att testa API:et, kan du använda Insomnia eller någon annan API-klient. Se till att servern är igång och gör förfrågningar till angivna endpoints.
