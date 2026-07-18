import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "android-cheat-sheet",
  title: "Android Development — Cheat Sheet",
  category: "Mobile",
  difficulty: "Beginner",
  readingTime: "3 min",
  pages: 2,
  lastUpdated: "July 2026",
  tags: ["Android", "Jetpack"],
  heroImage: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1800&q=80",
  heroSubtitle: 'One-page Android reference — Kotlin, Compose, Jetpack, Retrofit, and Room snippets.',
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Security, Performance & Deployment" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Android Development — Beginner Guide", tag: "Android", time: "10 min" },
  { title: "Android Development — Cheat Sheet", tag: "Jetpack", time: "3 min" },
  { title: "Android Development — Interview Questions", tag: "Android", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/android-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/android-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Cheat Sheet</b> — modern, production-ready Android development.</li>
          <li>Build native Android apps with <b>Kotlin</b>, Jetpack Compose, and Material Design 3.</li>
          <li>Apply MVVM / MVI + Clean Architecture with ViewModel, Room, Retrofit, and Hilt.</li>
          <li>Use coroutines + Flow for async work, and WorkManager for background jobs.</li>
          <li>Test with JUnit, Espresso, MockK, and Robolectric; wire CI/CD with Fastlane + GitHub Actions.</li>
          <li>Sign, bundle (AAB), and publish to the Play Store with staged rollouts and crash reporting.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic programming — variables, functions, classes, and control flow.</li>
          <li>Android Studio Hedgehog+ installed, with an emulator or physical device.</li>
          <li>Familiarity with Git and GitHub for source control.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — Android platform, SDK, Studio, Gradle, AAB vs APK</li>
          <li>Kotlin — null safety, coroutines, Flow, extensions, functional style</li>
          <li>UI (XML) — ConstraintLayout, RecyclerView, Material Components</li>
          <li>Jetpack Compose — composables, state, layouts, Material 3, navigation</li>
          <li>Components — Activities, Fragments, Services, Broadcast Receivers, Content Providers</li>
          <li>Jetpack — ViewModel, LiveData, Navigation, WorkManager, Paging, Hilt, Lifecycle</li>
          <li>Storage — SharedPreferences, DataStore, Room, SQLite, Firestore</li>
          <li>Networking — Retrofit, OkHttp, Ktor, REST, GraphQL, WebSockets, JSON</li>
          <li>Auth — Firebase Auth, Google Sign-In, OAuth, JWT, biometrics, OTP</li>
          <li>Architecture — MVC / MVP / MVVM / MVI, Clean Architecture, DI, SOLID</li>
          <li>Multimedia — CameraX, ExoPlayer, Glide, Coil, image + video</li>
          <li>Location & Maps — Google Maps SDK, GPS, geofencing, Places</li>
          <li>Testing — JUnit, Espresso, UI Automator, Robolectric, MockK</li>
          <li>Performance — memory, ANRs, battery, profiling, baseline profiles</li>
          <li>Security — Keystore, encryption, cert pinning, Play Integrity</li>
          <li>Cloud & backend — Firebase, Supabase, AWS, GCP, FCM push</li>
          <li>CI/CD — GitHub Actions, Fastlane, Bitrise, automated tests, releases</li>
          <li>Play Store — AAB, signing, publishing, Play Console, updates, analytics</li>
          <li>AI — Gemini + OpenAI APIs, ML Kit, TensorFlow Lite, on-device inference</li>
          <li>Real-world projects and career roadmap</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Android powers over 3 billion active devices — from phones and tablets to TVs, wearables, and cars. Modern Android is a <b>Kotlin-first</b> platform built around <b>Jetpack Compose</b>, Coroutines, and a curated set of Jetpack libraries that codify years of best practice. This resource — <b>Android Development — Cheat Sheet</b> — is self-contained: One-page Android reference — Kotlin, Compose, Jetpack, Retrofit, and Room snippets.</p>
        <Callout tone="info" title="Android in one line">Android app = Kotlin + Jetpack Compose UI + ViewModel state + Room/Retrofit data + Clean Architecture + Play Store.</Callout>
        <Figure src="https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1400&q=80" caption="Figure 1 — Android platform architecture — Linux kernel, HAL, native libraries, ART, framework, and apps." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — Android architecture, SDK, Android Studio, Gradle, manifest, AAB vs APK, ADB, emulator.</li>
          <li><b>Kotlin</b> — null safety, data classes, sealed classes, coroutines, Flow, extension functions, DSLs.</li>
          <li><b>UI (XML)</b> — ConstraintLayout / Linear / Relative, RecyclerView, CardView, Navigation Drawer, Material Components.</li>
          <li><b>Jetpack Compose</b> — composables, remember/state hoisting, Layouts, Material 3, LazyColumn, animations, theming, performance.</li>
          <li><b>Components</b> — Activities, Fragments, Intents (implicit + explicit), Services, Broadcast Receivers, Content Providers, Permissions, Notifications.</li>
          <li><b>Jetpack</b> — ViewModel, LiveData, Room, DataStore, Navigation Component, WorkManager, Paging 3, Hilt, Lifecycle, App Startup.</li>
          <li><b>Storage</b> — SharedPreferences, Preferences + Proto DataStore, SQLite, Room, Firestore, Realm, SQLDelight.</li>
          <li><b>Networking</b> — Retrofit + OkHttp + Moshi/Kotlinx-Serialization, Ktor client, REST, GraphQL (Apollo), WebSockets.</li>
          <li><b>Auth</b> — Firebase Authentication, Google Sign-In / Credential Manager, OAuth 2.0, JWT, BiometricPrompt, phone/OTP.</li>
          <li><b>Architecture</b> — MVVM + Repository (default), MVI for complex state; Clean Architecture (data / domain / presentation); Hilt DI; SOLID.</li>
          <li><b>Multimedia</b> — CameraX, MediaPlayer, ExoPlayer/Media3, image loading (Glide / Coil), video streaming.</li>
          <li><b>Location & Maps</b> — FusedLocationProvider, Google Maps SDK, geofencing, Places API.</li>
          <li><b>Testing</b> — JUnit4/5, Espresso, UI Automator, Robolectric, MockK, Truth; integration tests via Hilt test rules.</li>
          <li><b>Performance</b> — memory + leak detection (LeakCanary), ANR prevention, battery, Android Profiler, baseline + startup profiles.</li>
          <li><b>Security</b> — Android Keystore, EncryptedSharedPreferences, certificate pinning, Play Integrity API, ProGuard/R8.</li>
          <li><b>Cloud</b> — Firebase (Auth, Firestore, FCM, Crashlytics, Remote Config), Supabase, AWS Amplify, GCP, Azure.</li>
          <li><b>CI/CD</b> — GitHub Actions + Fastlane, Bitrise, Jenkins; automated unit / instrumented tests, screenshot testing.</li>
          <li><b>Play Store</b> — Play Console, signing (Play App Signing), staged rollouts, in-app updates, Play Vitals, analytics.</li>
          <li><b>AI</b> — Gemini + OpenAI APIs, ML Kit (vision, NLP, barcode, OCR), TensorFlow Lite, on-device inference.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`UI Layer (Jetpack Compose / XML)
   │  events
   ▼
ViewModel (state + business logic, coroutines + Flow)
   │
   ▼
Domain Layer (UseCases — pure Kotlin)
   │
   ▼
Data Layer
   ├── Repository (single source of truth)
   ├── Local  → Room / DataStore
   └── Remote → Retrofit / Ktor / Firebase / Supabase
   │
   ▼
Platform (Android SDK, Jetpack, OS services, Keystore)`}
        </pre>
        <Code lang="kotlin">{`// Jetpack Compose + ViewModel + Flow — canonical MVVM screen
class ProductsViewModel(
  private val repo: ProductRepository
) : ViewModel() {
  val uiState: StateFlow<UiState> = repo.observeProducts()
    .map<List<Product>, UiState> { UiState.Success(it) }
    .onStart { emit(UiState.Loading) }
    .catch { emit(UiState.Error(it.message ?: "Unknown")) }
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), UiState.Loading)
}

@Composable
fun ProductsScreen(vm: ProductsViewModel = hiltViewModel()) {
  val state by vm.uiState.collectAsStateWithLifecycle()
  when (val s = state) {
    UiState.Loading    -> CircularProgressIndicator()
    is UiState.Error   -> Text("Error: " + s.message)
    is UiState.Success -> LazyColumn {
      items(s.items, key = { it.id }) { p -> ProductRow(p) }
    }
  }
}`}</Code>
        <Code lang="kotlin">{`// Retrofit + Kotlinx Serialization + coroutines
@Serializable data class Product(val id: String, val name: String, val price: Double)

interface ProductApi {
  @GET("products") suspend fun list(): List<Product>
}

val api: ProductApi = Retrofit.Builder()
  .baseUrl("https://api.example.com/")
  .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
  .client(OkHttpClient.Builder().addInterceptor(HttpLoggingInterceptor()).build())
  .build()
  .create(ProductApi::class.java)`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1400&q=80" caption="Figure 2 — Modern Android app architecture — UI, ViewModel, UseCases, Repository, and remote/local data sources." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Notes app</b> — offline-first with Room + WorkManager sync.</li>
          <li><b>Expense tracker</b> — Compose UI, DataStore, and charts.</li>
          <li><b>Food delivery / ride-sharing</b> — Maps, FusedLocation, FCM push, order flow.</li>
          <li><b>E-commerce</b> — catalog, cart, checkout, payments (UPI / Stripe / Play Billing).</li>
          <li><b>Chat</b> — Firestore or Supabase Realtime, FCM, message pagination.</li>
          <li><b>Banking / healthcare</b> — biometrics, encryption, Play Integrity, secure networking.</li>
          <li><b>LMS / CRM</b> — role-based UI, offline sync, analytics.</li>
          <li><b>AI assistant</b> — Gemini API + on-device ML Kit for vision/NLP.</li>
        </ul>
        <Code lang="xml">{`<!-- ConstraintLayout — classic XML UI for a login form -->
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent" android:layout_height="match_parent">

  <com.google.android.material.textfield.TextInputLayout
      android:id="@+id/emailLayout"
      android:layout_width="0dp" android:layout_height="wrap_content"
      app:layout_constraintTop_toTopOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintEnd_toEndOf="parent">
    <com.google.android.material.textfield.TextInputEditText
        android:layout_width="match_parent" android:layout_height="wrap_content"
        android:hint="Email" android:inputType="textEmailAddress" />
  </com.google.android.material.textfield.TextInputLayout>

  <com.google.android.material.button.MaterialButton
      android:id="@+id/loginBtn"
      android:layout_width="wrap_content" android:layout_height="wrap_content"
      android:text="Login"
      app:layout_constraintTop_toBottomOf="@id/emailLayout"
      app:layout_constraintStart_toStartOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <b>Kotlin + Jetpack Compose</b> for new apps; keep XML only for legacy screens.</li>
          <li>Follow <b>MVVM + Clean Architecture</b>; one ViewModel per screen, UseCases in the domain layer.</li>
          <li>Model UI state as an immutable <code>sealed interface UiState</code>; render exhaustively with <code>when</code>.</li>
          <li>Do all IO on <code>Dispatchers.IO</code>; never block the main thread.</li>
          <li>Use Hilt for DI so tests can swap implementations easily.</li>
          <li>Persist offline-first with Room; sync with WorkManager + exponential backoff.</li>
          <li>Enable R8 / ProGuard, minify + shrink resources, and ship AABs — never bare APKs.</li>
          <li>Automate CI: unit + instrumented tests + lint on every PR; Fastlane for releases.</li>
          <li>Instrument crash reporting (Crashlytics / Sentry) + Play Vitals from day one.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Memory / context leaks</b> — holding Activity in a static field or long-lived listener.</li>
          <li><b>Blocking main thread</b> → ANRs; DB / network on UI thread.</li>
          <li>Ignoring lifecycle — running work after <code>onDestroy</code>; using <code>viewLifecycleOwner</code> wrong in Fragments.</li>
          <li>Massive Activities / Fragments with business logic; no ViewModel.</li>
          <li>Using <code>runBlocking</code> in production; missing <code>SupervisorJob</code> in scopes.</li>
          <li>Storing secrets in SharedPreferences unencrypted; committing keys to Git.</li>
          <li>Skipping <code>ProGuard</code>/R8 rules for reflection + serialization libraries.</li>
          <li>Deep navigation with manual FragmentTransactions instead of Navigation Component.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <code>collectAsStateWithLifecycle()</code> in Compose to avoid work in background.</li>
          <li>Use <code>@Stable</code> / <code>@Immutable</code> annotations to help Compose skip recomposition.</li>
          <li>Adopt <b>Baseline Profiles</b> for faster app startup out of the box.</li>
          <li>Use <b>Now in Android</b> repo as a reference for modern architecture.</li>
          <li>Prefer <code>DataStore</code> over <code>SharedPreferences</code> for new code.</li>
          <li>Use <code>LeakCanary</code> in debug builds — leaks caught early save huge time.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Compose vs XML</td><td>UI toolkit</td><td>Compose for new apps; XML only for legacy or fine-grained view interop.</td></tr>
              <tr><td className="py-2 pr-4">MVVM vs MVI</td><td>Architecture</td><td>MVVM for most apps; MVI when state is highly complex + testable.</td></tr>
              <tr><td className="py-2 pr-4">Retrofit vs Ktor</td><td>Networking</td><td>Retrofit for interface-based REST; Ktor for KMP + coroutine-native APIs.</td></tr>
              <tr><td className="py-2 pr-4">Room vs SQLDelight</td><td>Local DB</td><td>Room for Android-only; SQLDelight for KMP + type-safe SQL.</td></tr>
              <tr><td className="py-2 pr-4">Hilt vs Koin</td><td>DI</td><td>Hilt (compile-time, Google) default; Koin for lighter setup.</td></tr>
              <tr><td className="py-2 pr-4">LiveData vs StateFlow</td><td>Observable state</td><td>StateFlow for new code; LiveData for legacy compatibility.</td></tr>
              <tr><td className="py-2 pr-4">Glide vs Coil</td><td>Image loading</td><td>Coil for Kotlin-first + coroutines; Glide for Java + legacy.</td></tr>
              <tr><td className="py-2 pr-4">Firebase vs Supabase</td><td>BaaS</td><td>Firebase for Google-native stack; Supabase for Postgres + open source.</td></tr>
              <tr><td className="py-2 pr-4">Native vs KMP vs Flutter</td><td>Platform</td><td>Native for depth; KMP for shared logic; Flutter for cross-platform UI.</td></tr>
              <tr><td className="py-2 pr-4">AAB vs APK</td><td>Distribution</td><td>AAB is required for Play; APK for internal sideloading.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — Android Keystore for keys, EncryptedSharedPreferences, cert pinning, Play Integrity API.</li>
          <li><b>Privacy</b> — declare all data collection in the Play Data Safety form; request minimum runtime permissions.</li>
          <li><b>Performance</b> — Baseline Profiles, startup profiling, avoiding jank (frame time &lt; 16ms), memory profiler.</li>
          <li><b>Deployment</b> — Play App Signing, AAB, staged rollout, in-app updates, remote config kill switches.</li>
          <li><b>Observability</b> — Crashlytics + Sentry, Play Vitals, custom analytics, ANR + startup metrics.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Modern Android = Kotlin + Jetpack Compose + Coroutines + Jetpack libraries.</li>
          <li>MVVM + Clean Architecture keeps apps testable and modular.</li>
          <li>Offline-first with Room, sync with WorkManager, and observe with Flow.</li>
          <li>Guard against leaks, ANRs, and lifecycle bugs from day one.</li>
          <li>Ship AABs, sign with Play App Signing, and monitor with Crashlytics + Play Vitals.</li>
          <li>AI features via Gemini, ML Kit, and TensorFlow Lite are increasingly table-stakes.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Kotlin or Java for a new Android app?">Kotlin, unquestionably — Google's official language, cleaner syntax, and required for Compose.</FAQItem>
        <FAQItem q="Should I learn XML or jump straight to Compose?">Learn Compose first; know enough XML to maintain legacy screens.</FAQItem>
        <FAQItem q="MVVM or MVI?">MVVM is the practical default. Use MVI when your screen has many independent events + complex state.</FAQItem>
        <FAQItem q="Do I need Java at all?">Only for legacy code, some libraries, and interviews. New code should be Kotlin.</FAQItem>
        <FAQItem q="Is Flutter better than native?">Flutter is great for cross-platform UI; native Android is best for depth, performance, and platform APIs.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://developer.android.com/" target="_blank" rel="noreferrer">Android Developers</a> · <a className="text-primary hover:underline" href="https://kotlinlang.org/docs/home.html" target="_blank" rel="noreferrer">Kotlin</a></li>
          <li><a className="text-primary hover:underline" href="https://developer.android.com/jetpack/compose" target="_blank" rel="noreferrer">Jetpack Compose</a> · <a className="text-primary hover:underline" href="https://developer.android.com/jetpack" target="_blank" rel="noreferrer">Android Jetpack</a></li>
          <li><a className="text-primary hover:underline" href="https://m3.material.io/" target="_blank" rel="noreferrer">Material Design 3</a> · <a className="text-primary hover:underline" href="https://firebase.google.com/docs" target="_blank" rel="noreferrer">Firebase</a></li>
          <li><a className="text-primary hover:underline" href="https://kotlinlang.org/docs/coroutines-overview.html" target="_blank" rel="noreferrer">Coroutines</a> · <a className="text-primary hover:underline" href="https://developers.google.com/ml-kit" target="_blank" rel="noreferrer">ML Kit</a> · <a className="text-primary hover:underline" href="https://play.google.com/console/about/" target="_blank" rel="noreferrer">Play Console</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is for educational purposes only. Android, Google Play, Firebase, and related marks are trademarks of Google LLC. Always consult the official documentation and validate against your own project requirements before shipping.</p>
      </Section>
    </ReaderShell>
  );
}
