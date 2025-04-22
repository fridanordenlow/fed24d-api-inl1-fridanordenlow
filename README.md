# FED24D API Inlämning 1 - API-utveckling och databasnormalisering

## Beskrivning

Detta projekt innehåller en Express-baserad API för en produktkatalog i en e-shop. API:et är kopplat till en normaliserad MySQL-databas och hanterar produkter och tillhörande kategorier. Uppgiften omfattar att bygga ett ER-diagram, skapa och normalisera databasen samt implementera ett API som kan hantera produkter och kategorier.

### Funktioner:

- **Normaliserad databas**: Produkter och kategorier lagras i separata tabeller med korrekta primär- och främmande nycklar (Primary and Foreign Keys).
- **Express API**: Ett API som tillhandahåller CRUD-funktioner för produkter och kategorier.
- **Testdata**: Databasen innehåller testdata för att underlätta verifiering av API-funktionaliteten.

## Innehåll:

- [`docs/e-shop_er-diagram.png`](docs/e-shop_er-diagram.png) – ER-diagram för databasens struktur
- [`database/inl1_eshop.sql`](database/inl1_eshop.sql) – SQL-fil för databasstruktur och testdata
- Express API-kod i `src/`

## API-endpoints:

**Produkter:**

- `GET /products` – Hämta alla produkter
- `GET /products/:id` – Hämta produkt baserat på ID
- `POST /products` – Skapa en ny produkt
- `PATCH /products/:id` – Uppdatera en produkt
- `DELETE /products/:id` – Ta bort en produkt

**Kategorier:**

- `GET /categories` – Hämta alla kategorier
- `GET /categories/:id` – Hämta en kategori baserat på ID
- `GET /categories/:id/products` – Hämta alla produkter i en viss kategori
- `POST /categories` – Skapa en ny kategori
- `PATCH /categories/:id` – Uppdatera en kategori
- `DELETE /categories/:id` – Ta bort en kategori

## Test

För att testa API:et kan du använda Insomnia, Postman eller annan API-klient.  
Se till att:

1. Databasen är importerad från `inl1_eshop.sql`.
2. Servern är igång (`npm run dev` eller liknande).
3. Du gör förfrågningar till angivna endpoints.
