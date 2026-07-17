
-- Upskilling Hub
CREATE TABLE public.upskill_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  description text,
  difficulty text NOT NULL DEFAULT 'beginner',
  estimated_hours numeric(5,1),
  cover_url text,
  audience text[] NOT NULL DEFAULT ARRAY['student','professional','organization']::text[],
  learning_objectives jsonb NOT NULL DEFAULT '[]'::jsonb,
  prerequisites jsonb NOT NULL DEFAULT '[]'::jsonb,
  modules jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.upskill_courses TO authenticated, anon;
GRANT ALL ON public.upskill_courses TO service_role;
ALTER TABLE public.upskill_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "upskill_courses readable" ON public.upskill_courses FOR SELECT TO authenticated, anon USING (is_published);

CREATE TABLE public.upskill_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.upskill_courses(id) ON DELETE CASCADE,
  progress smallint NOT NULL DEFAULT 0,
  completed_modules jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'active',
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.upskill_enrollments TO authenticated;
GRANT ALL ON public.upskill_enrollments TO service_role;
ALTER TABLE public.upskill_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "upskill_enrollments own" ON public.upskill_enrollments FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Resource bookmarks (used by lesson resources)
CREATE TABLE public.resource_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);
GRANT SELECT, INSERT, DELETE ON public.resource_bookmarks TO authenticated;
GRANT ALL ON public.resource_bookmarks TO service_role;
ALTER TABLE public.resource_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bookmarks" ON public.resource_bookmarks FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Mock Tests
CREATE TABLE public.mock_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  duration_minutes smallint NOT NULL DEFAULT 30,
  total_questions smallint NOT NULL DEFAULT 0,
  difficulty text NOT NULL DEFAULT 'beginner',
  audience text[] NOT NULL DEFAULT ARRAY['student','professional','organization']::text[],
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.mock_tests TO authenticated, anon;
GRANT ALL ON public.mock_tests TO service_role;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mock_tests readable" ON public.mock_tests FOR SELECT TO authenticated, anon USING (is_published);

CREATE TABLE public.mock_test_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  order_index smallint NOT NULL DEFAULT 0,
  prompt text NOT NULL,
  choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_index smallint NOT NULL,
  explanation text
);
GRANT SELECT ON public.mock_test_questions TO authenticated;
GRANT ALL ON public.mock_test_questions TO service_role;
ALTER TABLE public.mock_test_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mock_test_questions readable" ON public.mock_test_questions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.mock_tests t WHERE t.id = test_id AND t.is_published));

CREATE TABLE public.mock_test_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id uuid NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  score smallint,
  max_score smallint,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mock_test_attempts TO authenticated;
GRANT ALL ON public.mock_test_attempts TO service_role;
ALTER TABLE public.mock_test_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own attempts" ON public.mock_test_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Seed upskilling catalog
INSERT INTO public.upskill_courses (slug, title, category, description, difficulty, estimated_hours, audience, learning_objectives, prerequisites, modules, is_featured) VALUES
('python-programming-fundamentals','Python Programming Fundamentals','Programming','Start coding with Python from zero. Variables, control flow, functions, and small projects.','beginner',20,ARRAY['student','professional','organization'],
 '["Understand variables, types and operators","Write functions and control flow","Work with lists, dicts and files","Build a small CLI project"]'::jsonb,
 '["No prior programming knowledge required"]'::jsonb,
 '[{"title":"Getting started with Python","summary":"Install Python, run your first script, learn the REPL."},{"title":"Variables, types and operators","summary":"Numbers, strings, booleans, arithmetic and comparisons."},{"title":"Control flow","summary":"if/else, for and while loops with practice."},{"title":"Functions and modules","summary":"Define reusable functions, organize code in modules."},{"title":"Data structures","summary":"Lists, tuples, dicts and sets in depth."},{"title":"Files and error handling","summary":"Reading/writing files and try/except."},{"title":"Mini project — CLI Todo","summary":"Combine everything into a small command-line app."}]'::jsonb, true),
('modern-web-development','Modern Web Development with React','Web Development','Build responsive, production-ready web apps with React, TypeScript and Tailwind.','intermediate',30,ARRAY['student','professional','organization'],
 '["Master modern JSX and hooks","Manage state with Context and Query","Build accessible UI with Tailwind","Deploy a full app"]'::jsonb,
 '["Basic HTML/CSS","JavaScript fundamentals"]'::jsonb,
 '[{"title":"HTML, CSS and JS refresher","summary":"Bring your fundamentals up to speed."},{"title":"React essentials","summary":"Components, props, state and events."},{"title":"Hooks in depth","summary":"useState, useEffect, useMemo and custom hooks."},{"title":"Data fetching","summary":"React Query patterns for real APIs."},{"title":"Routing and forms","summary":"Client routing and form handling."},{"title":"Styling with Tailwind","summary":"Design tokens, responsive layouts."},{"title":"Deployment","summary":"Build, host and monitor a live app."}]'::jsonb, true),
('mobile-development-react-native','Mobile Development with React Native','Mobile Development','Ship iOS and Android apps from one codebase with React Native and Expo.','intermediate',28,ARRAY['student','professional','organization'],
 '["Understand native app lifecycles","Navigate with Expo Router","Use device APIs (camera, storage)","Publish to app stores"]'::jsonb,
 '["Comfort with React"]'::jsonb,
 '[{"title":"React Native + Expo setup","summary":"Environment and hello world."},{"title":"Core components and layout","summary":"View, Text, Flexbox on mobile."},{"title":"Navigation","summary":"Stacks, tabs and deep links."},{"title":"State and async data","summary":"Query + persisted stores."},{"title":"Device APIs","summary":"Camera, storage, notifications."},{"title":"Publishing","summary":"EAS builds and store submission."}]'::jsonb, false),
('intro-to-ai','Introduction to Artificial Intelligence','Artificial Intelligence','Understand what AI is, how it learns, and how to use it responsibly.','beginner',15,ARRAY['student','professional','organization'],
 '["Explain AI, ML and DL","Recognize common AI tasks","Use AI tools productively","Reason about ethics and bias"]'::jsonb,
 '["Curiosity — no math required"]'::jsonb,
 '[{"title":"What is AI?","summary":"History, definitions and myths."},{"title":"How machines learn","summary":"Supervised, unsupervised, reinforcement."},{"title":"Neural networks explained","summary":"Intuition without heavy math."},{"title":"AI in the real world","summary":"Vision, language, robotics, generative."},{"title":"Ethics and safety","summary":"Bias, misuse, evaluation."}]'::jsonb, true),
('machine-learning-with-python','Machine Learning with Python','Machine Learning','Hands-on ML with scikit-learn: regression, classification and evaluation.','intermediate',26,ARRAY['student','professional','organization'],
 '["Preprocess and split data","Train regression and classification models","Evaluate with proper metrics","Avoid overfitting"]'::jsonb,
 '["Python basics","Basic statistics"]'::jsonb,
 '[{"title":"The ML workflow","summary":"Problem framing to deployment."},{"title":"Data preparation","summary":"Cleaning, encoding, scaling."},{"title":"Regression","summary":"Linear and regularized models."},{"title":"Classification","summary":"Logistic, trees and forests."},{"title":"Evaluation","summary":"Cross-validation, metrics."},{"title":"Case study","summary":"Build and evaluate a model end to end."}]'::jsonb, false),
('data-science-foundations','Data Science Foundations','Data Science','Turn raw data into insights with Python, pandas and visualisation.','beginner',22,ARRAY['student','professional','organization'],
 '["Load and clean tabular data","Explore data with pandas","Communicate findings with charts","Answer real questions from data"]'::jsonb,
 '["Python basics helpful"]'::jsonb,
 '[{"title":"Thinking with data","summary":"Questions before answers."},{"title":"pandas essentials","summary":"Series, DataFrames, joins."},{"title":"Cleaning messy data","summary":"Missing values and types."},{"title":"Visualisation","summary":"matplotlib and seaborn."},{"title":"Storytelling","summary":"Presenting findings clearly."}]'::jsonb, true),
('cloud-computing-essentials','Cloud Computing Essentials','Cloud Computing','Learn the core building blocks of cloud: compute, storage, networking and identity.','beginner',18,ARRAY['student','professional','organization'],
 '["Explain IaaS/PaaS/SaaS","Deploy a simple workload","Understand cloud pricing","Follow security basics"]'::jsonb,
 '["Comfort with the command line"]'::jsonb,
 '[{"title":"Cloud concepts","summary":"Providers, regions, availability."},{"title":"Compute and storage","summary":"VMs, containers, object storage."},{"title":"Networking basics","summary":"VPC, load balancers, DNS."},{"title":"Identity and access","summary":"IAM, roles and least privilege."},{"title":"Deploy an app","summary":"Ship a small workload to the cloud."}]'::jsonb, false),
('cybersecurity-essentials','Cybersecurity Essentials','Cybersecurity','The mindset and habits every learner and professional needs to stay safe online.','beginner',16,ARRAY['student','professional','organization'],
 '["Recognise common attacks","Apply strong authentication","Protect personal and org data","Respond to incidents"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"The threat landscape","summary":"Attackers, motives, patterns."},{"title":"Passwords and MFA","summary":"Modern authentication done right."},{"title":"Phishing and social engineering","summary":"Spot and stop attacks."},{"title":"Device and data hygiene","summary":"Encryption, backups, updates."},{"title":"Incident response","summary":"When things go wrong."}]'::jsonb, true),
('uiux-design-basics','UI/UX Design Basics','UI/UX Design','Design usable, delightful interfaces with strong visual and interaction fundamentals.','beginner',18,ARRAY['student','professional','organization'],
 '["Apply core UX principles","Sketch and prototype flows","Design with type, colour and grid","Run quick usability tests"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Design thinking","summary":"Empathy, define, ideate, prototype, test."},{"title":"Visual fundamentals","summary":"Type, colour, spacing, hierarchy."},{"title":"Interaction design","summary":"States, feedback, motion."},{"title":"Prototyping","summary":"Wireframes to clickable prototypes."},{"title":"Usability testing","summary":"Learn from real users fast."}]'::jsonb, false),
('devops-fundamentals','DevOps Fundamentals','DevOps','CI/CD, containers and infrastructure as code — the professional developer toolkit.','intermediate',24,ARRAY['professional','organization','student'],
 '["Build a CI/CD pipeline","Package apps with Docker","Automate infra with IaC","Monitor production apps"]'::jsonb,
 '["Basic programming","Comfort with the terminal"]'::jsonb,
 '[{"title":"DevOps culture","summary":"Why DevOps, and how teams work."},{"title":"Version control workflows","summary":"Branching, PRs, code review."},{"title":"CI/CD","summary":"Automated tests, builds, deploys."},{"title":"Containers","summary":"Docker basics and best practices."},{"title":"Infrastructure as Code","summary":"Terraform and beyond."},{"title":"Observability","summary":"Logs, metrics, traces."}]'::jsonb, false),
('software-testing-basics','Software Testing Basics','Software Testing','Ship confident software with unit, integration and end-to-end testing.','beginner',14,ARRAY['student','professional','organization'],
 '["Write focused unit tests","Design integration tests","Automate E2E flows","Interpret coverage sensibly"]'::jsonb,
 '["Any programming language"]'::jsonb,
 '[{"title":"Why we test","summary":"Confidence, speed, quality."},{"title":"Unit testing","summary":"Small tests, big returns."},{"title":"Integration and E2E","summary":"Test the seams and full flows."},{"title":"Mocking and fixtures","summary":"Isolate the unit under test."},{"title":"Coverage and quality","summary":"Metrics without goodharting."}]'::jsonb, false),
('effective-communication-skills','Effective Communication Skills','Communication Skills','Speak, write and listen with clarity, empathy and impact.','beginner',10,ARRAY['student','professional','organization'],
 '["Structure ideas clearly","Write emails that get read","Give and receive feedback","Present with confidence"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Structuring your message","summary":"Pyramid principle in practice."},{"title":"Written communication","summary":"Emails, docs, chat."},{"title":"Active listening","summary":"Hear what people actually mean."},{"title":"Feedback conversations","summary":"Direct + kind = growth."},{"title":"Presenting","summary":"Slides, stories, delivery."}]'::jsonb, true),
('leadership-for-modern-teams','Leadership for Modern Teams','Leadership','Lead people, not tasks. Trust, direction, and delivery in real teams.','intermediate',12,ARRAY['professional','organization'],
 '["Set clear direction","Coach and delegate","Run productive 1:1s","Handle conflict fairly"]'::jsonb,
 '["Some team experience helpful"]'::jsonb,
 '[{"title":"What leaders actually do","summary":"Direction, alignment, commitment."},{"title":"Coaching","summary":"Grow people through work."},{"title":"Delegation","summary":"Own outcomes, not tasks."},{"title":"Difficult conversations","summary":"Say the hard thing, well."},{"title":"Leading change","summary":"Bring people with you."}]'::jsonb, false),
('interview-preparation','Interview Preparation','Interview Preparation','Crack technical and behavioural interviews with a repeatable playbook.','beginner',14,ARRAY['student','professional'],
 '["Structure behavioural answers","Solve coding problems calmly","Handle system design basics","Negotiate offers"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"The interview loop","summary":"What companies really evaluate."},{"title":"STAR stories","summary":"Behavioural answers that land."},{"title":"Coding interviews","summary":"Patterns and practice."},{"title":"System design basics","summary":"Communicate under uncertainty."},{"title":"Offers and negotiation","summary":"Ask well, ask kindly."}]'::jsonb, true),
('resume-building','Resume Building','Resume Building','Write a resume recruiters actually read — and remember.','beginner',6,ARRAY['student','professional'],
 '["Craft strong bullet points","Tailor for each role","Pass ATS screens","Design a clean layout"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Resume principles","summary":"One page, results-first."},{"title":"Impact bullets","summary":"Verb + task + measurable result."},{"title":"Tailoring","summary":"Match keywords, honestly."},{"title":"Design and formatting","summary":"ATS-safe layouts."},{"title":"Cover letters","summary":"Short, human, specific."}]'::jsonb, false),
('competitive-exam-prep','Competitive Exam Preparation','Competitive Exams','Study smarter for entrance and government exams with proven strategies.','beginner',20,ARRAY['student'],
 '["Design a study plan","Master aptitude fundamentals","Practise time management","Handle exam anxiety"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Planning your prep","summary":"Syllabus, timeline, tracking."},{"title":"Quantitative aptitude","summary":"Numbers, ratios, algebra."},{"title":"Verbal and reasoning","summary":"Comprehension and logic."},{"title":"General awareness","summary":"Current affairs habits."},{"title":"Mock tests","summary":"Practise like the real exam."}]'::jsonb, false),
('productivity-tools-mastery','Productivity Tools Mastery','Productivity Tools','Master the tools you already use — Docs, Sheets, Slides, calendars and AI assistants.','beginner',10,ARRAY['student','professional','organization'],
 '["Get to inbox zero (and stay)","Use spreadsheets like a pro","Build reusable templates","Delegate to AI safely"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Managing your calendar","summary":"Focus vs meeting time."},{"title":"Docs and notes","summary":"Systems that scale."},{"title":"Spreadsheets in depth","summary":"Lookups, pivots, charts."},{"title":"Slides that communicate","summary":"Less is more."},{"title":"AI as a co-pilot","summary":"Prompting for real work."}]'::jsonb, true),
('career-preparation-toolkit','Career Preparation Toolkit','Career Preparation','Plan a career you actually want — from discovery to first offer.','beginner',12,ARRAY['student','professional'],
 '["Clarify your strengths","Explore career paths","Build a professional brand","Network with confidence"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Know yourself","summary":"Strengths, values, motivations."},{"title":"Career mapping","summary":"Paths and pivots."},{"title":"Personal brand","summary":"LinkedIn, portfolio, presence."},{"title":"Networking that works","summary":"Warm intros over cold DMs."},{"title":"Your job search plan","summary":"Systems beat luck."}]'::jsonb, false),
('soft-skills-at-work','Soft Skills at Work','Soft Skills','Collaboration, empathy and ownership — the skills that compound over a career.','beginner',8,ARRAY['student','professional','organization'],
 '["Collaborate across teams","Show ownership at work","Manage your time and energy","Grow with feedback"]'::jsonb,
 '["None"]'::jsonb,
 '[{"title":"Collaboration","summary":"Working well with others."},{"title":"Ownership","summary":"Being reliable and proactive."},{"title":"Time and energy","summary":"Sustainable productivity."},{"title":"Feedback and growth","summary":"Turn feedback into gains."}]'::jsonb, false);

-- Seed a couple of mock tests
INSERT INTO public.mock_tests (title, category, description, duration_minutes, total_questions, difficulty)
VALUES
  ('Python Fundamentals — Practice Test','Programming','Quick 10-question warm-up covering syntax, data types and control flow.',15,10,'beginner'),
  ('Aptitude Warm-up','Competitive Exams','Reasoning and quant sampler.',15,10,'beginner');

WITH t AS (SELECT id FROM public.mock_tests WHERE title = 'Python Fundamentals — Practice Test')
INSERT INTO public.mock_test_questions (test_id, order_index, prompt, choices, correct_index, explanation)
SELECT t.id, i.o, i.p, i.c::jsonb, i.k, i.e FROM t, (VALUES
  (1,'Which keyword defines a function in Python?','["fun","def","function","lambda"]',1,'def defines a named function.'),
  (2,'What is the output of len("edu")?','["2","3","4","error"]',1,'"edu" has 3 characters.'),
  (3,'Which data type is mutable?','["tuple","str","list","int"]',2,'Lists are mutable.'),
  (4,'Result of 5 // 2 ?','["2.5","2","3","2.0"]',1,'Floor division returns 2.'),
  (5,'Which loop keeps running while a condition is true?','["for","while","do","repeat"]',1,'while loops on a condition.'),
  (6,'How do you start a comment?','["//","#","--","/*"]',1,'# starts a line comment.'),
  (7,'What is a dict key requirement?','["Mutable","Hashable","Numeric","Sorted"]',1,'Dict keys must be hashable.'),
  (8,'Which converts str to int?','["str()","int()","float()","bool()"]',1,'int() converts to integer.'),
  (9,'What does range(3) yield?','["1,2,3","0,1,2","0,1,2,3","3"]',1,'range(3) yields 0,1,2.'),
  (10,'Which handles errors?','["if/else","try/except","for/else","catch/finally"]',1,'try/except handles exceptions.')
) AS i(o,p,c,k,e);

WITH t AS (SELECT id FROM public.mock_tests WHERE title = 'Aptitude Warm-up')
INSERT INTO public.mock_test_questions (test_id, order_index, prompt, choices, correct_index, explanation)
SELECT t.id, i.o, i.p, i.c::jsonb, i.k, i.e FROM t, (VALUES
  (1,'12 + 8 x 2 = ?','["40","28","32","20"]',1,'Multiplication first: 8x2=16, +12=28.'),
  (2,'Next in series: 2,4,8,16,?','["18","24","32","20"]',2,'Each doubles: 32.'),
  (3,'If A=1,B=2,... what is E?','["3","4","5","6"]',2,'E is the 5th letter.'),
  (4,'20% of 250 = ?','["25","40","50","60"]',2,'20% of 250 = 50.'),
  (5,'Odd one out','["Square","Circle","Triangle","Cube"]',3,'Cube is 3D.'),
  (6,'Ratio 3:4, if first is 12, second?','["14","15","16","18"]',2,'12 * 4/3 = 16.'),
  (7,'Speed = 60km/h, time 2.5h. Distance?','["120","135","150","165"]',2,'60*2.5=150.'),
  (8,'Average of 4,8,12','["6","8","10","12"]',1,'Sum 24 /3 = 8.'),
  (9,'HCF of 12 and 18','["2","3","6","9"]',2,'HCF is 6.'),
  (10,'Which is prime?','["9","15","17","21"]',2,'17 is prime.')
) AS i(o,p,c,k,e);
