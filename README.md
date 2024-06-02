# Dokumentace projektu

---

## Název projektu: **React Note-taking App**

---

## Cíl projektu
Cílem tohoto projektu je vytvořit moderní a uživatelsky přívětivou webovou aplikaci pro správu poznámek pomocí Reactu. Aplikace umožňuje uživatelům vytvářet, upravovat, mazat a připínat poznámky. Navíc nabízí funkce pro filtrování poznámek podle štítků a zobrazení statistik o poznámkách. Projekt se zaměřuje na využití moderních webových technologií, včetně pokročilých API, CSS3 animací a přechodů, a podporuje offline funkčnost pomocí LocalStorage.

---

## Postup

1. **Nastavení projektu:**
    - Iniciace projektu pomocí `create-react-app`.
    - Instalace potřebných závislostí jako React Router a Tailwind CSS.
    - Konfigurace struktury projektu a organizace složek pro komponenty, stránky a utilitní funkce.

2. **Vytvoření základních komponent:**
    - **NavBar**: Hlavní navigační panel s odkazy na různé stránky aplikace a indikací online/offline stavu.
    - **HomePage**: Úvodní stránka s uvítací sekcí, rychlým přístupem a statistikami.
    - **NewNoteForm**: Formulář pro přidávání nových poznámek.
    - **NoteList**: Komponenta pro zobrazení seznamu poznámek s možností filtrování podle štítků.
    - **PinnedNotesList**: Komponenta pro zobrazení připnutých poznámek.
    - **NoteModal**: Modal okno pro zobrazení detailů poznámky a její úpravy.

3. **Přidání funkcionalit:**
    - **CRUD operace pro poznámky**: Funkce pro vytváření, čtení, aktualizaci a mazání poznámek pomocí LocalStorage.
    - **Připínání poznámek**: Funkce pro připnutí/odepnutí poznámky.
    - **Filtrování poznámek**: Možnost filtrování poznámek podle štítků.
    - **Statistiky uživatele**: Zobrazení statistik, jako je počet poznámek, počet připnutých poznámek, nedávné poznámky a nejčastější štítek.

4. **Integrace pokročilých API:**
    - **Geolokace**: Načtení aktuální polohy uživatele při vytvoření poznámky a její uložení do LocalStorage.
    - **Cat Facts API**: Možnost získat a uložit náhodný fakt o kočkách jako poznámku, pokud je uživatel online.

5. **Styling a animace:**
    - Použití Tailwind CSS pro rychlý a efektivní styling komponent.
    - Přidání CSS3 animací a přechodů pro lepší uživatelský zážitek, včetně 3D animace loga a animace SVG prvků.

6. **Optimalizace pro mobilní zařízení:**
    - Přidání responzivních stylů pomocí Tailwind CSS a mediálních dotazů pro zajištění správného zobrazení na různých zařízeních.

7. **Testování a nasazení:**
    - Testování jednotlivých funkcionalit a opravování chyb.
    - Nasazení aplikace na platformě podle výběru (např. Vercel, Netlify).

---

## Popis funkčnosti

### **NavBar**
Navigační panel obsahující odkazy na hlavní stránky aplikace (Home, Notes, Account) a indikátor online/offline stavu uživatele.

### **HomePage**
Úvodní stránka aplikace obsahující uvítací sekci, rychlý přístup k nejčastěji používaným funkcím a statistiky o poznámkách uživatele.

### **NewNoteForm**
Formulář pro přidávání nových poznámek. Umožňuje zadat název, obsah a štítky poznámky. Při uložení poznámky se přehraje zvuk a poznámka se uloží do LocalStorage. Pokud je uživatel online, je možnost získat a uložit náhodný fakt o kočkách jako poznámku.

### **NoteList**
Seznam všech poznámek uložených v LocalStorage. Umožňuje filtrování poznámek podle štítků a zobrazuje poznámky seřazené od nejnovějších po nejstarší.

### **PinnedNotesList**
Seznam připnutých poznámek. Umožňuje rychlý přístup k důležitým poznámkám a zobrazení detailů poznámky v modal okně.

### **NoteModal**
Modal okno pro zobrazení detailů poznámky. Umožňuje editaci poznámky, její připnutí/odepnutí a mazání poznámky. Obsahuje také potvrzovací dialog pro smazání poznámky.

### **AccountPage**
Stránka s uživatelskými statistikami, včetně počtu poznámek, připnutých poznámek, nedávných poznámek a nejčastějšího štítku. Zobrazuje také aktuální polohu uživatele, pokud je dostupná.

---