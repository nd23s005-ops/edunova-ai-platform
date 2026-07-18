import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "flutter-project-case-study",
  title: "Flutter — Project Case Study",
  category: "Mobile",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 27,
  lastUpdated: "February 2026",
  tags: ["Flutter", "Dart"],
  heroImage: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1800&q=80",
  heroSubtitle: 'Anatomy of a real Flutter project — feature modules, DI, offline-first, and store rollout.',
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
  { title: "Flutter — Beginner Guide", tag: "Flutter", time: "15 min" },
  { title: "Flutter — Cheat Sheet", tag: "Dart", time: "4 min" },
  { title: "Flutter — Interview Questions", tag: "Flutter", time: "42 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/flutter-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/flutter-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Project Case Study</b> — modern, production-ready Flutter development.</li>
          <li>Build cross-platform apps with <b>Dart</b>, Flutter widgets, and Material 3 / Cupertino.</li>
          <li>Apply MVVM / Clean Architecture with Riverpod (or Bloc), Dio, Hive/Isar, and Firebase.</li>
          <li>Use Futures, Streams, and isolates for async work; test with widget + integration tests.</li>
          <li>Profile with Flutter DevTools; ship signed builds to Play Store, App Store, and Web.</li>
          <li>Wire CI/CD with Codemagic / GitHub Actions / Fastlane and monitor with Crashlytics.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic programming — variables, functions, classes, and control flow.</li>
          <li>Flutter SDK installed with Android Studio / VS Code and an emulator or device.</li>
          <li>Familiarity with Git and GitHub for source control.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — Flutter, Dart, SDK, tooling, project structure, Hot Reload</li>
          <li>Dart — null safety, async/await, Futures, Streams, generics, mixins, extensions</li>
          <li>Widgets — Stateless, Stateful, keys, BuildContext, lifecycle, composition</li>
          <li>Layouts — Container, Row/Column, Stack, Expanded, GridView, ListView, Slivers</li>
          <li>Navigation — Navigator 1.0/2.0, named routes, go_router, deep links, guards</li>
          <li>State — setState, Provider, Riverpod, Bloc/Cubit, GetX, MobX, Redux</li>
          <li>Forms — Form, TextFormField, validators, formatters</li>
          <li>Networking — http, Dio, REST, GraphQL, WebSockets, JSON serialization</li>
          <li>Local storage — SharedPreferences, Hive, Isar, ObjectBox, SQLite, secure storage</li>
          <li>Firebase — Auth, Firestore, Realtime DB, Storage, Functions, FCM, Crashlytics</li>
          <li>Platform features — camera, gallery, GPS, maps, sensors, Bluetooth, NFC, permissions</li>
          <li>UI/Design — Material 3, Cupertino, themes, dark mode, responsive + adaptive</li>
          <li>Animations — implicit, explicit, Hero, Tween, AnimationController, Lottie, Rive</li>
          <li>Testing — unit, widget, integration, mocking, golden tests</li>
          <li>Performance — DevTools, memory, lazy loading, tree shaking, deferred components</li>
          <li>Security — secure storage, JWT, OAuth, biometrics, cert pinning, encryption</li>
          <li>Backend — Firebase, Supabase, AWS, GCP, Appwrite, PocketBase</li>
          <li>Multi-platform — Android, iOS, Web, Windows, macOS, Linux, embedded</li>
          <li>CI/CD — GitHub Actions, Codemagic, Bitrise, Fastlane, store deployment</li>
          <li>AI — Gemini/OpenAI, ML Kit, TFLite, OCR, speech, image recognition</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Flutter is Google's open-source UI toolkit for crafting natively compiled applications for <b>mobile (Android + iOS), web, and desktop</b> from a single Dart codebase. Its widget-based rendering pipeline, hot reload, and vast package ecosystem make it a first-class choice for cross-platform product teams. This resource — <b>Flutter — Project Case Study</b> — is self-contained: Anatomy of a real Flutter project — feature modules, DI, offline-first, and store rollout.</p>
        <Callout tone="info" title="Flutter in one line">Flutter app = Dart + Widget tree + state management + platform channels + Skia/Impeller rendering → one codebase, many platforms.</Callout>
        <Figure src="https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1400&q=80" caption="Figure 1 — Flutter architecture — framework, engine (Skia/Impeller), and embedder for each target platform." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — Flutter SDK, channels, Flutter CLI, Android Studio + VS Code + Xcode, pubspec.yaml, Hot Reload vs Hot Restart.</li>
          <li><b>Dart</b> — null safety, records, patterns, async/await, Futures, Streams, isolates, generics, mixins, extensions.</li>
          <li><b>Widgets</b> — Stateless vs Stateful, Widget/Element/RenderObject trees, BuildContext, keys, lifecycle (initState/dispose), composition.</li>
          <li><b>Layouts</b> — Container, Row/Column, Stack, Flex, Wrap, ListView, GridView, CustomScrollView, Slivers, responsive breakpoints.</li>
          <li><b>Navigation</b> — Navigator 1.0 (imperative) + 2.0 (declarative), named routes, <b>go_router</b>, auto_route, deep links, guards.</li>
          <li><b>State management</b> — setState for local, Provider / <b>Riverpod</b> / Bloc-Cubit / GetX / MobX / Redux for app-wide state.</li>
          <li><b>Forms</b> — Form + FormState, TextFormField, validators, InputFormatters, custom form fields.</li>
          <li><b>Networking</b> — http, <b>Dio</b>, REST clients, GraphQL (graphql_flutter), WebSockets, JSON serialization + freezed/json_serializable.</li>
          <li><b>Storage</b> — SharedPreferences, <b>Hive</b>, Isar, ObjectBox, SQLite (sqflite, drift), flutter_secure_storage.</li>
          <li><b>Firebase</b> — Core, Auth, Firestore, Realtime DB, Storage, Cloud Functions, FCM, Analytics, Crashlytics, Remote Config.</li>
          <li><b>Platform features</b> — camera, image_picker, geolocator, google_maps_flutter, sensors, flutter_blue_plus, mobile_scanner, permission_handler.</li>
          <li><b>UI</b> — Material 3, Cupertino, ThemeData, dark/light modes, typography, adaptive/responsive layouts (LayoutBuilder, MediaQuery).</li>
          <li><b>Animations</b> — implicit (AnimatedContainer), explicit (AnimationController + Tween), Hero, staggered, Lottie, Rive.</li>
          <li><b>Testing</b> — unit (test), widget (flutter_test), integration_test, golden tests, mocktail/mockito.</li>
          <li><b>Performance</b> — DevTools, const constructors, RepaintBoundary, image caching, lazy builders, tree shaking, deferred components.</li>
          <li><b>Security</b> — flutter_secure_storage, JWT, OAuth (google_sign_in, sign_in_with_apple), local_auth, certificate pinning, encryption.</li>
          <li><b>Backend</b> — Firebase, Supabase, AWS Amplify, GCP, Azure, Appwrite, PocketBase.</li>
          <li><b>Multi-platform</b> — Android, iOS, Web (CanvasKit/HTML), Windows, macOS, Linux, embedded (flutter-pi).</li>
          <li><b>CI/CD</b> — GitHub Actions, Codemagic, Bitrise, Fastlane, Play + App Store deploy, Firebase App Distribution.</li>
          <li><b>AI</b> — Gemini + OpenAI APIs, ML Kit, TensorFlow Lite, on-device OCR, speech, image recognition.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Presentation (Widgets + Riverpod/Bloc)
   │  events
   ▼
Application (Notifiers / Blocs — state + business logic)
   │
   ▼
Domain (UseCases — pure Dart)
   │
   ▼
Data
   ├── Repository (single source of truth)
   ├── Local  → Hive / Isar / sqflite / SharedPreferences
   └── Remote → Dio / http / Firebase / Supabase
   │
   ▼
Platform (Flutter engine, platform channels, native SDKs)`}
        </pre>
        <Code lang="dart">{`// Riverpod + AsyncNotifier — canonical async screen state
final productsProvider =
    AsyncNotifierProvider<ProductsNotifier, List<Product>>(ProductsNotifier.new);

class ProductsNotifier extends AsyncNotifier<List<Product>> {
  @override
  Future<List<Product>> build() async {
    final repo = ref.read(productRepoProvider);
    return repo.list();
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => ref.read(productRepoProvider).list());
  }
}

class ProductsScreen extends ConsumerWidget {
  const ProductsScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(productsProvider);
    return async.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Center(child: Text('Error: ' + e.toString())),
      data: (items) => ListView.builder(
        itemCount: items.length,
        itemBuilder: (_, i) => ProductRow(product: items[i]),
      ),
    );
  }
}`}</Code>
        <Code lang="dart">{`// Dio + freezed model + repository — typed REST client
@freezed
class Product with _\$Product {
  const factory Product({ required String id, required String name, required double price }) = _Product;
  factory Product.fromJson(Map<String, dynamic> j) => _\$ProductFromJson(j);
}

class ProductRepository {
  ProductRepository(this._dio);
  final Dio _dio;

  Future<List<Product>> list() async {
    final res = await _dio.get<List<dynamic>>('/products');
    return (res.data ?? []).map((e) => Product.fromJson(e as Map<String, dynamic>)).toList();
  }
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1400&q=80" caption="Figure 2 — Modern Flutter app architecture — Presentation, Application, Domain, and Data layers with platform channels." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Notes app</b> — offline-first with Hive/Isar + WorkManager equivalent (workmanager package).</li>
          <li><b>Expense tracker</b> — Riverpod state, fl_chart charts, and secure storage.</li>
          <li><b>Chat app</b> — Firestore or Supabase Realtime, FCM push, message pagination.</li>
          <li><b>Food delivery / ride-sharing</b> — Google Maps, geolocator, FCM, order flow.</li>
          <li><b>E-commerce</b> — catalog, cart, checkout, in-app purchases + Stripe.</li>
          <li><b>Banking / healthcare</b> — biometrics, encryption, cert pinning, secure networking.</li>
          <li><b>LMS / CRM</b> — role-based UI, offline sync, analytics.</li>
          <li><b>AI assistant</b> — Gemini API + on-device ML Kit for vision/NLP.</li>
        </ul>
        <Code lang="dart">{`// Flutter widget composition — a simple login form
class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(children: [
        TextFormField(
          controller: _email,
          decoration: const InputDecoration(labelText: 'Email'),
          keyboardType: TextInputType.emailAddress,
          validator: (v) => (v == null || !v.contains('@')) ? 'Invalid email' : null,
        ),
        TextFormField(
          controller: _password,
          decoration: const InputDecoration(labelText: 'Password'),
          obscureText: true,
          validator: (v) => (v == null || v.length < 8) ? 'Min 8 chars' : null,
        ),
        FilledButton(
          onPressed: () { if (_formKey.currentState!.validate()) { /* submit */ } },
          child: const Text('Sign in'),
        ),
      ]),
    );
  }
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <b>const</b> constructors everywhere possible to skip rebuilds.</li>
          <li>Follow <b>Clean Architecture</b> with feature-first folders — presentation / application / domain / data.</li>
          <li>Prefer <b>Riverpod</b> (or Bloc) for app-wide state; keep <code>setState</code> to purely-local widget state.</li>
          <li>Model failures as sealed classes (freezed) — never throw across layers without typing.</li>
          <li>Do IO on background isolates or async APIs; never block the UI thread.</li>
          <li>Persist offline-first with Hive/Isar; sync in background with retry + backoff.</li>
          <li>Automate CI: unit + widget + integration tests + <code>dart analyze</code> on every PR.</li>
          <li>Instrument crash reporting (Crashlytics / Sentry) and analytics from day one.</li>
          <li>Ship signed AABs and IPAs via Fastlane / Codemagic — never manual store uploads.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Unnecessary rebuilds</b> — putting expensive widgets high in the tree without <code>const</code> or <code>Consumer</code>.</li>
          <li><b>Blocking the UI thread</b> — heavy work in <code>build()</code> or on the main isolate.</li>
          <li>Poor state management — global mutable singletons instead of Riverpod/Bloc.</li>
          <li>Memory leaks — forgetting to <code>dispose()</code> controllers, streams, or animation controllers.</li>
          <li>Improper navigation — pushing routes without <code>go_router</code> guards or deep-link handling.</li>
          <li>Storing tokens in SharedPreferences — use <code>flutter_secure_storage</code>.</li>
          <li>Skipping widget + golden tests — regressions ship silently.</li>
          <li>Ignoring platform differences — same widget renders differently on iOS vs Android.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <b>Flutter DevTools</b> for widget inspector, timeline, memory, and network profiling.</li>
          <li>Prefer <code>ListView.builder</code> over <code>ListView(children: [...])</code> for long lists.</li>
          <li>Wrap expensive subtrees in <b>RepaintBoundary</b> to isolate repaints.</li>
          <li>Use <code>freezed</code> + <code>json_serializable</code> for immutable models and typed JSON.</li>
          <li>Enable <b>Impeller</b> on iOS/Android for smoother rendering.</li>
          <li>Use <code>flutter_gen</code> for typed asset + font references.</li>
          <li>Adopt <b>deferred components</b> for large Android modules to keep initial download slim.</li>
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
              <tr><td className="py-2 pr-4">Riverpod vs Bloc</td><td>State</td><td>Riverpod for concise reactive state; Bloc for strict event-driven flows.</td></tr>
              <tr><td className="py-2 pr-4">Provider vs Riverpod</td><td>State</td><td>Provider for simple apps; Riverpod for compile-safe modern state.</td></tr>
              <tr><td className="py-2 pr-4">http vs Dio</td><td>Networking</td><td>http for simple calls; Dio for interceptors, retries, and cancellation.</td></tr>
              <tr><td className="py-2 pr-4">Hive vs Isar</td><td>Local DB</td><td>Hive for lightweight KV; Isar for typed queries + big datasets.</td></tr>
              <tr><td className="py-2 pr-4">Navigator 1.0 vs 2.0</td><td>Navigation</td><td>1.0 for simple stacks; 2.0 (go_router) for deep links + web URLs.</td></tr>
              <tr><td className="py-2 pr-4">Material vs Cupertino</td><td>Design</td><td>Material for Android + brand UI; Cupertino for iOS-authentic look.</td></tr>
              <tr><td className="py-2 pr-4">Firebase vs Supabase</td><td>Backend</td><td>Firebase for Google stack; Supabase for Postgres + open source.</td></tr>
              <tr><td className="py-2 pr-4">Flutter vs Native</td><td>Platform</td><td>Flutter for shared UI + speed; native for depth + platform-only APIs.</td></tr>
              <tr><td className="py-2 pr-4">AAB vs APK vs IPA</td><td>Distribution</td><td>AAB for Play; IPA for App Store; APK only for internal sideload.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — flutter_secure_storage, JWT, OAuth, local_auth (biometrics), certificate pinning, Play Integrity / App Attest.</li>
          <li><b>Privacy</b> — declare data collection in Play Data Safety + App Store privacy nutrition labels; request minimum permissions.</li>
          <li><b>Performance</b> — 60/120 fps target, avoid jank (frame &lt; 16ms/8ms), profile with DevTools, use Impeller.</li>
          <li><b>Deployment</b> — Fastlane / Codemagic, signed AAB + IPA, staged rollouts, Firebase App Distribution for beta testers.</li>
          <li><b>Observability</b> — Crashlytics + Sentry, custom analytics, ANR + startup metrics via Firebase Performance.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Modern Flutter = Dart + widgets + Riverpod/Bloc + Clean Architecture.</li>
          <li>Everything is a widget — compose small widgets rather than building big ones.</li>
          <li>Offline-first with Hive/Isar, sync with background workers, observe with Streams.</li>
          <li>Ship one codebase to Android, iOS, Web, and Desktop with adaptive UI.</li>
          <li>Automate testing + release with CI/CD (Codemagic / GitHub Actions / Fastlane).</li>
          <li>AI via Gemini, ML Kit, and TensorFlow Lite is increasingly table-stakes.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Flutter or React Native?">Flutter compiles to native, owns rendering with Skia/Impeller, and gives more consistent UI across platforms. RN reuses native widgets and JS ecosystem.</FAQItem>
        <FAQItem q="Riverpod or Bloc?">Riverpod is the practical default — less boilerplate, compile-safe. Bloc is great when you want strict event/state separation.</FAQItem>
        <FAQItem q="Do I need to learn Dart deeply?">Yes — null safety, Futures, Streams, and isolates are essential for real-world Flutter.</FAQItem>
        <FAQItem q="Is Flutter production-ready for iOS?">Absolutely — many top apps ship Flutter on iOS. Impeller further improves iOS rendering.</FAQItem>
        <FAQItem q="Flutter Web — production-ready?">Yes for logged-in dashboards and SPA-style apps; less ideal for SEO-critical marketing sites.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.flutter.dev/" target="_blank" rel="noreferrer">Flutter Docs</a> · <a className="text-primary hover:underline" href="https://dart.dev/guides" target="_blank" rel="noreferrer">Dart</a></li>
          <li><a className="text-primary hover:underline" href="https://riverpod.dev/" target="_blank" rel="noreferrer">Riverpod</a> · <a className="text-primary hover:underline" href="https://bloclibrary.dev/" target="_blank" rel="noreferrer">Bloc</a> · <a className="text-primary hover:underline" href="https://pub.dev/packages/go_router" target="_blank" rel="noreferrer">go_router</a></li>
          <li><a className="text-primary hover:underline" href="https://firebase.google.com/docs/flutter/setup" target="_blank" rel="noreferrer">Firebase for Flutter</a> · <a className="text-primary hover:underline" href="https://m3.material.io/" target="_blank" rel="noreferrer">Material 3</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.flutter.dev/tools/devtools/overview" target="_blank" rel="noreferrer">Flutter DevTools</a> · <a className="text-primary hover:underline" href="https://developers.google.com/ml-kit" target="_blank" rel="noreferrer">ML Kit</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is for educational purposes only. Flutter, Dart, Firebase, and related marks are trademarks of Google LLC. Always consult the official documentation and validate against your own project requirements before shipping.</p>
      </Section>
    </ReaderShell>
  );
}
