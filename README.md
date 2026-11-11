# მეგრული (MVP 0.1)

სასწავლო აპი: ახსნის ბარათები, მერე ქვიზები (არჩევანი, წყვილები), შეცდომების გამეორება, სერია და XP.
ვებ-ტექნოლოგიაა (HTML/CSS/JS, ფრეიმვორკის გარეშე), iOS-ზე Capacitor-ით იფუთება. პროგრესი ინახება localStorage-ში, ინტერნეტი და ანგარიში არ სჭირდება.

## გასაშვებად
- ბრაუზერში: `npx http-server docs -p 8080`
- შინაარსი: `docs/content.js`. გადამოწმების გვერდი სპეციალისტისთვის: `docs/review.html`

## App Store-ზე ასატვირთად (სჭირდება Mac + Xcode + Apple Developer ანგარიში, $99/წელი)
1. `npm install`
2. `capacitor.config.json`-ში `appId` შეცვალე შენი bundle id-ით (მაგ. `ge.tvoisaxeli.megruli`)
3. `npx cap add ios && npx cap sync && npx cap open ios`
4. Xcode-ში: Team აირჩიე, აიკონი (1024x1024) და Launch Screen ჩასვი, Archive, Upload
5. App Store Connect: აღწერა, სკრინშოტები, Privacy Policy URL, Age rating, Privacy "Data Not Collected"

## ჩაუსწორებელი, ტესტამდე აუცილებელი
- **ენის სპეციალისტის გადამოწმება** (`review.html`). ახლა ყველა გაკვეთილი `draft:true`-ია.
- **ფონტები ოფლაინ:** `style.css` იყენებს Noto Georgian-ს, მაგრამ ფაილები აპში არ არის ჩაშენებული. iOS-ის სისტემური ქართული ფონტი გამოდგება, ან ჩაამატე woff2 `docs/fonts`-ში.
- **აიკონი და splash:** არ არის.
- **Privacy Policy გვერდი:** გჭირდება საჯარო URL (შეიძლება saferentrome.com-ზე ან სხვა დომენზე).
- **Apple Guideline 4.2:** მხოლოდ ვებ-გვერდის გარსს Apple უარყოფს. აპს უნდა ჰქონდეს საკმარისი შინაარსი და ნატიური შეგრძნება (ახლა 3 გაკვეთილია, ეს ცოტაა). რეკომენდებულია ჯერ 10+ გაკვეთილი და ხმოვანი გამოთქმა.
- **აუდიო:** მეგრულისთვის TTS არ არსებობს, საჭიროა ჩაწერილი ხმა.

## საიტად გამოქვეყნება (უფასო)
GitHub: Settings → Pages → Source: `main`, folder: `/docs`. მისამართი იქნება `https://tariellomaia1-creator.github.io/megruli/`.
საიტი PWA-ა: ტელეფონზე "Add to Home Screen"-ით აპივით იხსნება და ოფლაინაც მუშაობს.
