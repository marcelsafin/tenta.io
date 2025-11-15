import { Question } from '../types';

export const quizQuestions: Question[] = [
  {
    questionText: "Vad är state i React?",
    questionType: 'multiple-choice',
    options: [
      { text: "En permanent lagring", isCorrect: false },
      { text: "Ett internt datalager för en komponent", isCorrect: true },
    ],
    correctAnswer: "Ett internt datalager för en komponent",
    points: 1,
    feedbackForWrongAnswer: "Fel. State är ett internt datalager som är specifikt för en komponent och hanterar data som kan förändras över tid.",
    hint: "Är det något som delas mellan komponenter, eller tillhör det en enda?"
  },
  {
    questionText: "Vad används för att skicka data till en komponent utifrån?",
    questionType: 'multiple-choice',
    options: [
      { text: "render med parametrar", isCorrect: false },
      { text: "PropTypes", isCorrect: false },
      { text: "props", isCorrect: true },
    ],
    correctAnswer: "props",
    points: 1,
    feedbackForWrongAnswer: "Fel. 'props' (properties) är det korrekta sättet att skicka data från en förälderkomponent ner till en barnkomponent.",
    hint: "Det är en förkortning av 'properties'."
  },
  {
    questionText: "Attribut på komponenter kallas för…",
    questionType: 'multiple-choice',
    options: [
      { text: "Keys", isCorrect: false },
      { text: "Props", isCorrect: true },
      { text: "Elements", isCorrect: false },
      { text: "Refs", isCorrect: false },
    ],
    correctAnswer: "Props",
    points: 1,
    feedbackForWrongAnswer: "Fel. Attribut som skickas till en React-komponent kallas för 'props'.",
    hint: "Det är så man skickar data till en komponent, vilket är relaterat till föregående fråga."
  },
  {
    questionText: "Hur binder du funktionen onAddTodoClick till när knappen nedan klickas på i JSX?",
    questionType: 'multiple-choice',
    options: [
      { text: "<button onClick=onAddTodoClick />", isCorrect: false },
      { text: "<button onClick=onAddTodoClick() />", isCorrect: false },
      { text: "<button onClick={onAddTodoClick} />", isCorrect: true },
      { text: "<button onClick={onAddTodoClick()} />", isCorrect: false },
      { text: `<button onClick="onAddTodoClick" />`, isCorrect: false },
      { text: `<button onClick="onAddTodoClick()" />`, isCorrect: false },
      { text: `<button onClick="{onAddTodoClick}" />`, isCorrect: false },
      { text: `<button onClick="{onAddTodoClick()}" />`, isCorrect: false },
    ],
    correctAnswer: "<button onClick={onAddTodoClick} />",
    points: 1,
    feedbackForWrongAnswer: "Fel. I JSX använder man måsvingar {} för att referera till JavaScript-uttryck. Funktionen ska skickas som en referens, inte anropas direkt.",
    hint: "I JSX använder man ett speciellt teckenpar för att inkludera JavaScript-uttryck."
  },
  {
    questionText: "Varför måste du använda className när du vill ge ett element en CSS-klass med React JSX?",
    questionType: 'open-ended',
    correctAnswer: "För att JSX är JavaScript och inte HTML, och 'class' är ett skyddat nyckelord (reserved keyword) i JavaScript.",
    points: 2,
    feedbackForWrongAnswer: "Eftersom JSX kompileras till JavaScript, där 'class' är ett reserverat ord för att skapa klasser, används 'className' istället för att undvika konflikter.",
    hint: "Tänk på vilket språk JSX kompileras till, och vilka ord som är reserverade där."
  },
  {
    questionText: "Hur kan du få en kodsnutt att köra efter att en komponent renderats första gången men inte vid efterföljande renderingar?",
    questionType: 'open-ended',
    correctAnswer: "Genom att använda useEffect-hooken med en tom dependency array: useEffect(() => { /* kod här */ }, [])",
    points: 2,
    feedbackForWrongAnswer: "Du använder useEffect-hooken och skickar med en tom array ([]) som det andra argumentet. Detta talar om för React att effekten inte beror på några värden och därför bara ska köras en gång efter den första renderingen.",
    hint: "En specifik hook används för sidoeffekter. Hur styr man när den körs?"
  },
  {
    questionText: "Vad är React Router?",
    questionType: 'open-ended',
    correctAnswer: "Ett standardbibliotek för routing i React. Det möjliggör navigering och rendering av olika komponenter baserat på URL:en i webbläsaren, utan att hela sidan laddas om.",
    points: 2,
    feedbackForWrongAnswer: "React Router är ett bibliotek som hanterar navigering i en React-applikation. Det synkroniserar UI:t med URL:en, vilket gör det möjligt att skapa single-page applications med flera vyer.",
    hint: "Vad hanterar det för problem i en 'Single-Page Application'?"
  },
  {
    questionText: "Beskriv varför behöver vi en router i React, och ge därefter minst två fördelar",
    questionType: 'open-ended',
    correctAnswer: "En router behövs för att skapa en single-page application (SPA) med flera vyer eller sidor. Fördelar: 1. Förbättrad användarupplevelse eftersom sidan inte behöver laddas om helt vid navigering. 2. Varje vy kan ha en unik URL, vilket gör dem bokmärkesbara och delbara.",
    points: 4,
    feedbackForWrongAnswer: "En router i React låter oss bygga en single-page-app med flera vyer utan att ladda om sidan. Fördelar inkluderar snabbare navigering för användaren och möjligheten att ha unika, delbara URL:er för olika delar av appen.",
    hint: "Tänk på användarupplevelsen jämfört med traditionella webbsidor och hur man delar länkar."
  },
  {
    questionText: "Hur skiljer sig routing i React från konventionell routing?",
    questionType: 'open-ended',
    correctAnswer: "Konventionell routing gör en ny förfrågan till servern för varje ny sida, vilket leder till en fullständig omladdning. React routing sker på klientsidan; den ändrar URL:en och renderar en ny komponent utan att kontakta servern för en ny HTML-sida.",
    points: 3,
    feedbackForWrongAnswer: "Huvudskillnaden är att React routing sker på klientsidan (client-side) medan konventionell routing sker på serversidan (server-side). Detta innebär att React kan byta vyer utan att sidan behöver laddas om.",
    hint: "Fokusera på var navigeringen hanteras: hos klienten eller på servern."
  },
  {
    questionText: "Hur definierar vi route-parametrar i URL:en i en Route?",
    questionType: 'open-ended',
    correctAnswer: "Med kolon-syntax i Route-komponentens 'path' prop, till exempel: <Route path='/users/:userId' />",
    points: 1,
    feedbackForWrongAnswer: "Du använder ett kolon (:) följt av parameternamnet i din Route-definition, t.ex. 'path='/items/:id''."
    ,
    hint: "Vilket tecken används i sökvägen för att markera en dynamisk del?"
  },
  {
    questionText: "Hur kommer vi åt en Route-parameter i en funktion-komponent?",
    questionType: 'open-ended',
    correctAnswer: "Med useParams-hooken från React Router, t.ex. const { userId } = useParams();",
    points: 1,
    feedbackForWrongAnswer: "Du använder 'useParams'-hooken som tillhandahålls av React Router. Den returnerar ett objekt med nyckel/värde-par från URL:en.",
    hint: "React Router har en specifik hook för detta, vars namn är ganska självförklarande."
  },
  {
    questionText: "Beskriv de två delarna som Context består av och vad varje del gör.",
    questionType: 'open-ended',
    correctAnswer: "Context består av en Provider och en Consumer. Provider-komponenten tillhandahåller ett värde till alla komponenter under den i trädet. Consumer-komponenten (eller useContext-hooken) används av barnkomponenter för att prenumerera och läsa det värde som Providern tillhandahåller.",
    points: 3,
    feedbackForWrongAnswer: "De två delarna är Provider och Consumer. Providern är komponenten som 'ger ut' datan, och alla dess barnkomponenter kan komma åt den. En Consumer (eller useContext-hooken) används för att 'ta emot' datan i en barnkomponent.",
    hint: "En del 'ger' ut datan, och en annan 'tar emot' den."
  },
  {
    questionText: "Vad är syftet med Context? Vilka problem löser det?",
    questionType: 'open-ended',
    correctAnswer: "Syftet är att dela data som kan anses vara 'global' för ett träd av komponenter. Det löser problemet med 'prop drilling', där man måste skicka props genom många nivåer av mellanliggande komponenter som själva inte behöver datan.",
    points: 4,
    feedbackForWrongAnswer: "Context löser problemet med 'prop drilling', alltså att behöva skicka ner data genom många komponentnivåer. Det ger ett sätt att göra data tillgänglig för alla komponenter i ett träd utan att skicka props manuellt.",
    hint: "Tänk på hur man skickar data genom många komponentnivåer utan Context."
  },
  {
    questionText: "Vad för regler gäller vid användning av alla hooks?",
    questionType: 'open-ended',
    correctAnswer: "Hooks får endast anropas på den översta nivån i React-funktionskomponenter eller i custom hooks. De får inte anropas inuti loopar, villkorssatser (if-statements) eller nästlade funktioner.",
    points: 3,
    feedbackForWrongAnswer: "Reglerna är: anropa bara hooks på toppnivån (inte i loopar, villkor eller nästlade funktioner) och anropa dem bara från React-funktionskomponenter eller custom hooks.",
    hint: "Var i en komponent får de anropas? Finns det platser de *inte* får anropas från?"
  },
  {
    questionText: "Varför är villkorade hooks inte tillåtna i React? Och vad skulle hända om vi ändå använde en hook i en if-sats eller en loop?",
    questionType: 'open-ended',
    correctAnswer: "React är beroende av att hooks anropas i samma ordning vid varje rendering för att kunna associera state med rätt hook. Om ordningen ändras (t.ex. genom en if-sats) kan React inte längre mappa state korrekt, vilket leder till oförutsägbara buggar och felaktigt state.",
    points: 4,
    feedbackForWrongAnswer: "React förlitar sig på anropsordningen för hooks för att bevara state. En villkorlig hook skulle ändra denna ordning mellan renderingar, vilket skulle göra att React tappar bort vilket state som hör till vilken hook, vilket leder till buggar.",
    hint: "React förlitar sig på en specifik sak för att hålla reda på vilken state som tillhör vilken hook."
  },
  {
    questionText: "Hur kan vi göra så att vissa hooks ändå bara körs när vissa krav är uppfyllda?",
    questionType: 'open-ended',
    correctAnswer: "Vi anropar alltid hooken, men placerar villkorslogiken *inuti* hooken. Till exempel kan man ha en if-sats inuti en useEffect-effekt.",
    points: 2,
    feedbackForWrongAnswer: "Du kan inte villkorligt anropa en hook, men du kan placera villkorslogik *inuti* hooken. Till exempel, en if-sats inuti en useEffect.",
    hint: "Anropet måste alltid ske, men logiken kan finnas *inuti* hooken."
  },
  {
    questionText: "Från vilka två ställen i en React-app kan vi kalla på hooks?",
    questionType: 'open-ended',
    correctAnswer: "1. Från React-funktionskomponenter. 2. Från Custom Hooks.",
    points: 2,
    feedbackForWrongAnswer: "Hooks kan endast anropas från React-funktionskomponenter och från andra custom hooks.",
    hint: "Det ena är en vanlig komponent, det andra är en återanvändbar..."
  },
  {
    questionText: "Vad för namngivningskonventioner gäller för Hooks?",
    questionType: 'open-ended',
    correctAnswer: "Namnet på en custom hook måste alltid börja med prefixet 'use', till exempel 'useUserData'.",
    points: 2,
    feedbackForWrongAnswer: "Alla hooks, både inbyggda och custom, måste börja med ordet 'use'.",
    hint: "Alla hook-funktioner måste börja med ett specifikt ord på tre bokstäver."
  },
  {
    questionText: "Vad är en Custom Hook i React?",
    questionType: 'open-ended',
    correctAnswer: "En custom hook är en JavaScript-funktion vars namn börjar med 'use' och som kan anropa andra hooks. Det är ett sätt att återanvända stateful logik mellan flera komponenter.",
    points: 2,
    feedbackForWrongAnswer: "Det är en funktion du skapar själv som låter dig återanvända state-logik. Den måste börja med 'use' och kan använda andra hooks som useState och useEffect.",
    hint: "Det är en funktion för att dela en viss typ av logik mellan komponenter."
  },
  {
    questionText: "Vad är motivationen bakom att skapa en Custom Hook? Alltså vad är det man vill uppnå?",
    questionType: 'open-ended',
    correctAnswer: "Huvudsyftet är att återanvända stateful logik. Istället för att duplicera samma logik (t.ex. att hämta data, prenumerera på en händelse) i flera komponenter, kan man extrahera den till en custom hook och använda den i alla komponenter som behöver den.",
    points: 4,
    feedbackForWrongAnswer: "Man vill uppnå återanvändning av logik som involverar state (stateful logic). Det hjälper också till att hålla komponenterna renare och mer fokuserade på presentation.",
    hint: "Det handlar om återanvändning och att undvika att upprepa kod."
  },
  {
    questionText: "På vilket sätt skiljer sig en Custom Hook från en funktions-komponent?",
    questionType: 'open-ended',
    correctAnswer: "En funktionskomponent returnerar JSX (UI-element). En custom hook returnerar inte JSX, utan returnerar istället värden, arrayer eller objekt (t.ex. state och funktioner för att uppdatera det).",
    points: 2,
    feedbackForWrongAnswer: "En custom hook returnerar inte JSX. Den returnerar vanligtvis data (som ett state-värde) och funktioner, medan en funktionskomponent returnerar ett React-element (JSX).",
    hint: "Tänk på vad de returnerar. Den ena returnerar UI, den andra..."
  },
  {
    questionText: "Vad är React Query och vad kan vi använda det till?",
    questionType: 'open-ended',
    correctAnswer: "React Query är ett bibliotek för att hantera 'server state' i React. Det används för att hämta, cacha, synkronisera och uppdatera data från en server (t.ex. via ett API) på ett effektivt sätt.",
    points: 2,
    feedbackForWrongAnswer: "Det är ett bibliotek för att hantera data från en server. Det förenklar datahämtning, cachning, och håller datan synkroniserad med servern.",
    hint: "Det hanterar data som inte finns i din app från början, utan måste hämtas."
  },
  {
    questionText: "Vilka är enligt dig de tre största sakerna som React Query hjälper oss med, som går att göra själv men är komplicerade?",
    questionType: 'open-ended',
    correctAnswer: "1. Caching: Sparar data för att undvika onödiga API-anrop. 2. Bakgrundsuppdateringar (Stale-while-revalidate): Håller datan färsk utan att blockera UI. 3. Deduplicering av förfrågningar: Om flera komponenter begär samma data samtidigt, görs bara ett API-anrop.",
    points: 6,
    feedbackForWrongAnswer: "Exempel är: Caching (att spara data lokalt), bakgrundsuppdateringar (att hålla datan färsk) och deduplicering av förfrågningar (att undvika dubbla anrop). Dessa är komplexa att hantera manuellt.",
    hint: "Tänk på att spara data lokalt, hålla den uppdaterad, och undvika onödiga nätverksanrop."
  },
  {
    questionText: "Om en query misslyckas, kommer React Query att försöka köra query:n igen?",
    questionType: 'multiple-choice',
    options: [
      { text: "Ja", isCorrect: true },
      { text: "Ja, om vi uttryckligen anger det", isCorrect: false },
      { text: "Nej", isCorrect: false },
    ],
    correctAnswer: "Ja",
    points: 1,
    feedbackForWrongAnswer: "Fel. Med standardinställningar kommer React Query automatiskt att försöka igen (retry) ett par gånger om ett anrop misslyckas.",
    hint: "Biblioteket är byggt för att vara robust mot tillfälliga nätverksproblem."
  },
  {
    questionText: "Vi vet att React Query kan användas för att hämta data, men kan vi även använda det för att förändra/skapa ny data?",
    questionType: 'multiple-choice',
    options: [
      { text: "Ja", isCorrect: true },
      { text: "Nej", isCorrect: false },
    ],
    correctAnswer: "Ja",
    points: 1,
    feedbackForWrongAnswer: "Fel. Ja, för att ändra data (POST, PUT, DELETE) använder man 'mutations' i React Query.",
    hint: "Ja, men det kallas inte för en 'query'."
  },
  {
    questionText: "Beskriv hur React Query avgör om resultatet av en query finns mellanlagrat (cachat)",
    questionType: 'open-ended',
    correctAnswer: "React Query använder en unik 'query key' för varje query. Denna nyckel fungerar som en identifierare för datan i cachen. När en query körs, kontrollerar React Query om det finns data i cachen som matchar den specifika query-nyckeln.",
    points: 4,
    feedbackForWrongAnswer: "Det görs med en unik 'query key'. Varje query måste ha en unik nyckel (ofta en array), och React Query använder denna nyckel för att identifiera och lagra data i sin cache.",
    hint: "Varje datahämtning behöver en unik identifierare."
  },
  {
    questionText: "Beskriv vad en mutation är och vad vi använder dem till i React Query",
    questionType: 'open-ended',
    correctAnswer: "En mutation används för att skapa, uppdatera eller radera data på servern. Till skillnad från queries (som är för att läsa data), används mutations för operationer som medför sidoeffekter på servern.",
    points: 2,
    feedbackForWrongAnswer: "En mutation används för att ändra data på servern, till exempel att skapa, uppdatera eller radera något (t.ex. via POST, PUT, DELETE-anrop).",
    hint: "Det är motsatsen till en query. Queries läser data, mutations..."
  },
  {
    questionText: "Ange de tre största fördelarna enligt dig med Firebases produktutbud, och motivera ditt svar",
    questionType: 'open-ended',
    correctAnswer: "1. Realtidsdatabas (Firestore): Enkelt att bygga realtidsfunktioner. 2. Authentication: Förenklar säker användarhantering avsevärt. 3. Hosting: Extremt enkelt att driftsätta webbapplikationer med ett enda kommando.",
    points: 6,
    feedbackForWrongAnswer: "Exempel på fördelar är enkelheten (lätt att komma igång), det breda ekosystemet (många verktyg som fungerar bra ihop, som Auth och Firestore) och skalbarheten (hanteras av Google).",
    hint: "Tänk på realtidsdata, användarhantering och driftsättning."
  },
  {
    questionText: "Vilka av Firebases produkter nedan har vi använt under kursen?",
    questionType: 'multiple-choice',
    options: [
      { text: "Authentication", isCorrect: true },
      { text: "Hosting", isCorrect: true },
      { text: "Cloud Firestore", isCorrect: true },
      { text: "Machine Learning", isCorrect: false },
      { text: "Cloud Functions", isCorrect: false },
      { text: "Cloud Storage", isCorrect: false },
      { text: "Realtime Database", isCorrect: false },
    ],
    correctAnswer: "Authentication, Hosting, Cloud Firestore",
    points: 1,
    feedbackForWrongAnswer: "Det korrekta svaret beror på kursen, men en vanlig kombination är Authentication, Hosting och Cloud Firestore.",
    hint: "Tänk på inloggning, databas och hosting."
  },
  {
    questionText: "Vad är skillnaden mellan Firebase och Cloud Firestore?",
    questionType: 'open-ended',
    correctAnswer: "Firebase är en plattform med ett paket av tjänster (Backend-as-a-Service), medan Cloud Firestore är en specifik tjänst inom Firebase-plattformen, nämligen en NoSQL-dokumentdatabas.",
    points: 1,
    feedbackForWrongAnswer: "Firebase är hela plattformen, medan Cloud Firestore är en av tjänsterna på plattformen (en databas).",
    hint: "Det ena är en hel plattform, det andra är en specifik tjänst på den plattformen."
  },
  {
    questionText: "Vad är Firebase Cloud Firestore för något?",
    questionType: 'open-ended',
    correctAnswer: "Cloud Firestore är en flexibel och skalbar NoSQL-dokumentdatabas från Google Firebase som är byggd för att lagra och synkronisera data för webb- och mobilapplikationer i realtid.",
    points: 1,
    feedbackForWrongAnswer: "Det är en NoSQL-dokumentdatabas i molnet som är en del av Firebase. Den används för att lagra och synkronisera applikationsdata.",
    hint: "Det är en specifik typ av databas. Är den SQL eller NoSQL?"
  },
  {
    questionText: "Vad är en begränsning med Cloud Firestore enligt dig?",
    questionType: 'open-ended',
    correctAnswer: "En begränsning är komplexa query-förfrågningar. Till skillnad från SQL-databaser är det svårare att göra avancerade sökningar och joins mellan olika datamängder. Fulltext-sökning kräver också en tredjepartstjänst.",
    points: 3,
    feedbackForWrongAnswer: "En vanlig begränsning är att den inte är idealisk för komplexa, relationella frågor som man enkelt kan göra i SQL. Fulltext-sökning är också en svaghet.",
    hint: "Tänk på hur man söker efter data jämfört med en traditionell SQL-databas."
  },
  {
    questionText: "Vad är Firebase Authentication?",
    questionType: 'open-ended',
    correctAnswer: "Firebase Authentication är en tjänst som tillhandahåller färdiga backend-tjänster och enkla SDK:er för att autentisera användare i en app. Den hanterar inloggning, registrering och användarsessioner.",
    points: 1,
    feedbackForWrongAnswer: "Det är en tjänst från Firebase som gör det enkelt att hantera användar-inloggning och -autentisering i din app.",
    hint: "Det hanterar allt som har med användare och inloggning att göra."
  },
  {
    questionText: "Nämn tre fördelar som Firebase Authentication ger jämfört med att bygga ett sådant system själv?",
    questionType: 'open-ended',
    correctAnswer: "1. Säkerhet: Hanteras av Google. 2. Snabbhet: Snabbt att implementera med färdiga SDK:er. 3. Flera providers: Inbyggt stöd för inloggning med Google, Facebook, etc.",
    points: 3,
    feedbackForWrongAnswer: "Fördelar inkluderar högre säkerhet (hanteras av Google), snabbare utveckling (mindre kod att skriva), och inbyggt stöd för tredjeparts-inloggning (t.ex. Google, Facebook).",
    hint: "Tänk på säkerhet, utvecklingstid och inloggningsalternativ."
  },
  {
    questionText: "Firebase Authentication gör inloggning med e-post + lösenord busenkelt, men går det även att sätta upp så vi kan logga in med t.ex. Google- eller Facebook-konton?",
    questionType: 'multiple-choice',
    options: [
      { text: "Japp, det är nästan lika enkelt", isCorrect: true },
      { text: "Absolut, men det kräver att vi tecknar oss för en betald prenumeration", isCorrect: false },
      { text: "Nej, det där går inte", isCorrect: false },
    ],
    correctAnswer: "Japp, det är nästan lika enkelt",
    points: 1,
    feedbackForWrongAnswer: "Fel. Det är nästan lika enkelt att integrera sociala inloggningsleverantörer som Google och Facebook.",
    hint: "Firebase vill göra det så enkelt som möjligt att integrera med andra stora tjänster."
  },
  {
    questionText: "Vad är Firebase Cloud Storage och hur skiljer den sig från Firebase Cloud Firestore?",
    questionType: 'open-ended',
    correctAnswer: "Cloud Storage är för lagring av filer och ostrukturerad data som bilder, videor och ljudfiler. Firestore är en databas för att lagra strukturerad JSON-liknande data.",
    points: 2,
    feedbackForWrongAnswer: "Cloud Storage är för filer (bilder, video), medan Firestore är för data (text, nummer, objekt). Tänk Storage som en hårddisk och Firestore som ett kalkylblad.",
    hint: "Det ena lagrar strukturerad data (som text), det andra lagrar filer."
  },
  {
    questionText: "Vad är Redux för något?",
    questionType: 'open-ended',
    correctAnswer: "Redux är ett förutsägbart state-hanteringsbibliotek för JavaScript-applikationer. Det hjälper till att hantera applikationens globala state på ett centraliserat och konsekvent sätt.",
    points: 1,
    feedbackForWrongAnswer: "Det är ett bibliotek för att hantera globalt state i en JavaScript-app. Det ger en central plats ('store') för all data.",
    hint: "Det är ett bibliotek för att hantera applikationens..."
  },
  {
    questionText: "Vilka fördelar ger Redux som är svårt att uppnå själv?",
    questionType: 'open-ended',
    correctAnswer: "Centraliserad state (single source of truth), förutsägbara state-uppdateringar via rena funktioner (reducers), och kraftfulla utvecklingsverktyg som 'time-travel debugging' via Redux DevTools.",
    points: 2,
    feedbackForWrongAnswer: "Fördelar är en centraliserad 'store' (single source of truth) och kraftfulla utvecklingsverktyg som Redux DevTools, som möjliggör 'time-travel debugging'.",
    hint: "Tänk på att ha en enda källa för all data och verktyg för felsökning."
  },
  {
    questionText: "Beskriv flödet för uppdatering av en state i Redux och vad som händer.",
    questionType: 'open-ended',
    correctAnswer: "1. UI skickar (dispatches) en action (ett objekt som beskriver vad som hände). 2. En reducer-funktion tar emot den nuvarande state och action. 3. Reducern returnerar ett helt nytt state-objekt baserat på action-typen. 4. Den globala store uppdateras med det nya state, och UI:t renderas om.",
    points: 3,
    feedbackForWrongAnswer: "Flödet är: UI dispatchar en action -> Reducern tar emot nuvarande state och action och returnerar ett nytt state -> Store uppdateras med det nya state -> UI uppdateras.",
    hint: "Det börjar med en 'action' och går via en 'reducer' till 'store'."
  }
];