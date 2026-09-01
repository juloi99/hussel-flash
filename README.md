# Hussel – Flash

Een toegankelijke, responsive webapp om namen willekeurig en zo gelijk mogelijk over groepen te verdelen. Namenlijsten worden uitsluitend lokaal in de browser bewaard; er is geen account, backend of tracking.

De app bevat twee gereedschappen met gedeelde namenlijsten:

- **Hussel** verdeelt deelnemers eerlijk over groepen.
- **Flash** kiest één of meerdere willekeurige namen via maximaal vijf geanimeerde wielen of een directe snelle keuze.

## Functies

- Verdeling op aantal groepen of personen per groep
- Eerlijke omgang met restpersonen: groepsgroottes verschillen maximaal één persoon
- Opnieuw loten zonder opnieuw invoeren
- Leerlingen tijdelijk vastzetten in een groep en leerlingen tijdelijk accentueren
- Geavanceerde modus met eenmalige of permanent aan een namenlijst gekoppelde samen-/apartregels
- Laatste handmatige verplaatsingen en verwijderingen herstellen
- Schermvullende presentatiemodus waarin leerlingen nog verplaatst of uit de actuele verdeling verwijderd kunnen worden
- Opschonen van lege regels en dubbele namen
- Vaste namenlijsten aanmaken, selecteren, automatisch bijwerken, hernoemen, dupliceren en verwijderen
- Duidelijke validatie, mobiele layout en toetsenbordbediening
- Nederlands/Frans via de taalknop, inclusief resultaten en exports
- Automatische geschiedenis met datum, uur, dataset en groepsindeling
- Iedere verdeling krijgt een eigen aanpasbare naam, die ook in exports wordt gebruikt
- Personen na het loten met slepen naar een andere groepskaart verplaatsen
- Een leerling eenmalig uit een gelote verdeling verwijderen zonder de dataset te wijzigen
- Een afzonderlijke verdeling hernoemen of verwijderen uit de geschiedenis
- PDF opent eerst als liggend kaartenoverzicht in een nieuw tabblad; Excel-compatibele CSV kan direct worden gedownload
- Back-up en herstel van lijsten en geschiedenis voor overdracht naar een andere browser
- Flash met een eenvoudige modus voor één wiel en een geavanceerde modus voor maximaal vijf gelijktijdige wielen, 3, 5 of 8 seconden draaitijd, één gezamenlijke geluidsbron, directe keuze en optioneel automatisch verwijderen
- Willekeurige trekking zonder teruglegging: iedereen komt eenmaal aan bod voordat een nieuwe ronde start
- Recente Flash-keuzes worden lokaal bewaard en meegenomen in de back-up

## Lokaal starten

Node.js 18 of nieuwer is voldoende. Er hoeven geen pakketten geïnstalleerd te worden.

```bash
npm run dev
```

Open daarna `http://localhost:4173`.

## Testen en bouwen

```bash
npm test
npm run build
```

De productieversie staat daarna in `dist/`.

## Publiceren

Upload de inhoud van `dist/` naar een statische host, bijvoorbeeld Netlify, Cloudflare Pages, GitHub Pages of Vercel. Er zijn geen omgevingsvariabelen of serverfuncties nodig. Voor Netlify kan `npm run build` als buildcommando en `dist` als publicatiemap worden gebruikt.

## Privacy en opslag

Lijsten, taalvoorkeur en geschiedenis worden onder de sleutel `hussel-state-v2` in `localStorage` bewaard; oudere lijsten worden automatisch overgenomen. Ze blijven in het huidige browserprofiel beschikbaar. Het wissen van browsergegevens verwijdert deze lokale gegevens.

Browsers mogen elkaars lokale opslag om veiligheidsredenen niet lezen. Gebruik daarom **Back-up** in de ene browser en **Overzetten** in de andere om alle gegevens mee te nemen.
