---
name: cpp-log-analyzer
description: Build, modify, or explain the C++ log analysis or server diagnostics tool for the exam project. Use this skill when the user asks about C++, log parsing, system diagnostics, reading log files, analyzing Apache or system logs, or building a terminal/CLI tool. Also use it when the user wants to add a C++ component to the exam project to show extra technical depth.
---

# C++ Log Analyzer

Et valgfritt C++-verktøy som leser og analyserer loggfiler fra Apache eller systemet. Gir ekstra uttelling på eksamen ved å vise kompetanse i lavnivå-programmering.

---

## Hva verktøyet skal gjøre

**Minimum (for eksamen):**
- Les en loggfil linje for linje
- Tell antall feil (4xx/5xx HTTP-statuskoder i Apache-logg, eller ERROR i systemlogg)
- Skriv ut en oppsummering

**Utvidet (for bedre karakter):**
- Filtrer på dato eller nivå (ERROR, WARNING, INFO)
- Tell unike IP-adresser
- Finn de hyppigste feilmeldingene
- Skriv rapport til fil

---

## Grunnleggende kodestruktur

```cpp
// log_analyzer.cpp
#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <regex>

struct LogStats {
    int totaltLinjer = 0;
    int feil4xx = 0;
    int feil5xx = 0;
    std::map<std::string, int> statuskoder;
};

LogStats analyserFil(const std::string& filsti) {
    std::ifstream fil(filsti);
    if (!fil.is_open()) {
        std::cerr << "Feil: Kan ikke åpne filen: " << filsti << std::endl;
        exit(1);
    }

    LogStats stats;
    std::string linje;
    // Apache Combined Log Format: ... "GET /path HTTP/1.1" 404 ...
    std::regex statusRegex(R"( (\d{3}) )");
    std::smatch treff;

    while (std::getline(fil, linje)) {
        stats.totaltLinjer++;
        if (std::regex_search(linje, treff, statusRegex)) {
            std::string kode = treff[1];
            stats.statuskoder[kode]++;
            int tallkode = std::stoi(kode);
            if (tallkode >= 400 && tallkode < 500) stats.feil4xx++;
            if (tallkode >= 500) stats.feil5xx++;
        }
    }
    return stats;
}

void skrivRapport(const LogStats& stats) {
    std::cout << "=== Logg-analyse ===" << std::endl;
    std::cout << "Totalt antall linjer: " << stats.totaltLinjer << std::endl;
    std::cout << "4xx-feil (klientfeil): " << stats.feil4xx << std::endl;
    std::cout << "5xx-feil (serverfeil): " << stats.feil5xx << std::endl;
    std::cout << "\nStatuskode-fordeling:" << std::endl;
    for (const auto& [kode, antall] : stats.statuskoder) {
        std::cout << "  HTTP " << kode << ": " << antall << " ganger" << std::endl;
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Bruk: " << argv[0] << " <loggfil>" << std::endl;
        return 1;
    }
    LogStats stats = analyserFil(argv[1]);
    skrivRapport(stats);
    return 0;
}
```

---

## Kompilering og kjøring

```bash
# Kompiler
g++ -std=c++17 -o log_analyzer log_analyzer.cpp

# Kjør på Apache access-logg
./log_analyzer /var/log/apache2/access.log

# Kjør på egen testfil
./log_analyzer testlogg.txt
```

**Makefile (valgfritt, ser profesjonelt ut):**
```makefile
CXX = g++
CXXFLAGS = -std=c++17 -Wall
TARGET = log_analyzer

$(TARGET): log_analyzer.cpp
	$(CXX) $(CXXFLAGS) -o $(TARGET) log_analyzer.cpp

clean:
	rm -f $(TARGET)
```

---

## Testlogg for utvikling

Lag en testfil `testlogg.txt`:
```
192.168.1.1 - - [01/Jan/2025:10:00:00] "GET /index.html HTTP/1.1" 200 1234
192.168.1.2 - - [01/Jan/2025:10:01:00] "GET /admin HTTP/1.1" 403 512
192.168.1.3 - - [01/Jan/2025:10:02:00] "POST /login HTTP/1.1" 404 256
192.168.1.1 - - [01/Jan/2025:10:03:00] "GET /api/data HTTP/1.1" 500 128
```

---

## Kobling til eksamensfag

- **Utvikling**: C++ er et programmeringsspråk som viser bredde utover web
- **Driftstøtte**: Verktøyet brukes til å overvåke og analysere serverlogger
- **Brukerstøtte**: Feilanalyse fra logger brukes til feilsøking

**Sensorbeskrivelse:**
> "Jeg har laget et C++-verktøy som leser Apache-logger og teller feil. Dette er nyttig for IT-driften fordi de raskt kan se om det er mange 500-feil som tyder på et serverproblem, eller mange 403-feil som kan bety et sikkerhetsproblem."
