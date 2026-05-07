-- Demo-data for SQLite/MariaDB-lignende tickets-tabell.
-- Tilpass kolonnenavn hvis prosjektet ditt bruker norsk navn som tittel/beskrivelse/prioritet.

INSERT INTO tickets (tittel, beskrivelse, status, prioritet, kategori, kø, løsning)
VALUES
('Printeren på lærerværelset skriver ikke ut', 'Ansatte får feilmelding når de prøver å skrive ut til printeren ved lærerværelset. Køen stopper og dokumenter blir stående fast.', 'Åpen', 'Normal', 'Hardware', 'IT-støtte', NULL),
('Passord må nullstilles for elevkonto', 'Bruker kommer ikke inn i Microsoft 365 og får beskjed om feil passord. Trenger passordreset og kontroll av MFA-status.', 'Under arbeid', 'Høy', 'Tilgang', 'Brukerstøtte', NULL),
('Wi-Fi faller ut i klasserom 204', 'Flere elever mister nettverk samtidig. Problemet skjer spesielt når mange er tilkoblet. Mulig feil med aksesspunkt eller DHCP.', 'Åpen', 'Høy', 'Nettverk', 'Nettverk', NULL),
('Programvareinstallasjon: Visual Studio Code', 'Utviklingsklassen trenger Visual Studio Code installert på flere klientmaskiner før neste prosjektøkt.', 'Løst', 'Lav', 'Software', 'Klientdrift', 'VS Code ble installert og testet på klientmaskinene.'),
('Kritisk nettverksbrudd i administrasjonen', 'Administrasjonen har mistet tilgang til interne systemer og internett. Flere brukere er påvirket. Må feilsøkes umiddelbart.', 'Åpen', 'Kritisk', 'Nettverk', 'Nettverk', NULL);
