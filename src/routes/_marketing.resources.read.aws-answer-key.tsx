import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "aws-answer-key",
  title: "AWS — Answer Key",
  category: "Cloud & DevOps",
  difficulty: "Beginner",
  readingTime: "30 min",
  pages: 41,
  lastUpdated: "May 2026",
  tags: ["AWS", "Cloud"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle: "Detailed answer key with explanations for AWS practice questions.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "AWS Architecture & Workflow" },
  { id: "services", label: "Core Service Catalog" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Performance, Security & Cost" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "AWS — Beginner Guide", tag: "AWS", time: "18 min" },
  { title: "AWS — Cheat Sheet", tag: "AWS", time: "3 min" },
  { title: "AWS — Interview Questions", tag: "AWS", time: "42 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/aws-answer-key")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/aws-answer-key" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand AWS global infrastructure — Regions, Availability Zones, and Edge Locations.</li>
          <li>Provision and secure workloads with IAM, VPC, EC2, S3, RDS, and Lambda.</li>
          <li>Apply the AWS Well-Architected Framework across all six pillars.</li>
          <li>Observe applications with CloudWatch, CloudTrail, and X-Ray.</li>
          <li>Design cost-optimized, highly available, and secure architectures on AWS.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (TCP/IP, DNS, HTTP) and Linux command-line familiarity.</li>
          <li>Comfort with a terminal, Git, and a scripting language such as Python or Bash.</li>
          <li>An AWS Free Tier account is helpful but not required to follow along.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Cloud Fundamentals</li>
          <li>Core Concepts — IAM, EC2, VPC, S3, RDS, Lambda</li>
          <li>AWS Architecture & Workflow</li>
          <li>Core Service Catalog</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Performance, Security, and Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Amazon Web Services (AWS) is the world's most broadly adopted cloud, offering 200+ services across compute, storage, databases, networking, analytics, AI/ML, DevOps, and security. This answer key focuses on the concepts and services you need to design, build, and operate production cloud workloads.</p>
        <Callout tone="info" title="AWS in one line">Resources live in an Account, inside an Organization, governed by IAM, SCPs, and Well-Architected pillars.</Callout>
        <Figure src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80" caption="Figure 1 — AWS global infrastructure — Regions, Availability Zones, and Edge Locations." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Global infrastructure</b> — Regions, AZs, Local Zones, Wavelength, and Edge Locations.</li>
          <li><b>Accounts & governance</b> — AWS Organizations, OUs, SCPs, and Control Tower.</li>
          <li><b>Compute</b> — EC2, Auto Scaling, ELB, Lambda, ECS, EKS, Fargate, Batch, Lightsail.</li>
          <li><b>Storage</b> — S3, S3 Glacier, EBS, EFS, FSx, Storage Gateway, AWS Backup.</li>
          <li><b>Databases</b> — RDS, Aurora, DynamoDB, ElastiCache, Redshift, Neptune, DocumentDB.</li>
          <li><b>Networking</b> — VPC, subnets, route tables, IGW, NAT, TGW, PrivateLink, Route 53, CloudFront, API Gateway.</li>
          <li><b>Identity</b> — IAM users, groups, roles, policies, MFA, IAM Identity Center, Cognito.</li>
          <li><b>Security</b> — KMS, Secrets Manager, ACM, GuardDuty, Inspector, Security Hub, Shield, WAF, Macie.</li>
          <li><b>Observability</b> — CloudWatch, CloudTrail, X-Ray, EventBridge, Config, Trusted Advisor.</li>
          <li><b>DevOps</b> — CloudFormation, CDK, CodeCommit/Build/Deploy/Pipeline, Systems Manager.</li>
          <li><b>AI/ML</b> — SageMaker, Bedrock, Rekognition, Textract, Comprehend, Translate, Polly, Lex.</li>
        </ul>
      </Section>

      <Section id="architecture" title="AWS Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`AWS Organization
  └─ OU (Sandbox / Dev / Prod)
      └─ Account
          └─ Region -> VPC (subnets, route tables, IGW/NAT)
                 │
                 ├─ Compute: EC2 / ECS / EKS / Lambda
                 ├─ Data: RDS / DynamoDB / S3
                 ├─ Identity: IAM roles + KMS + Secrets Manager
                 └─ Observability: CloudWatch + CloudTrail + X-Ray`}
        </pre>
        <Code>{`# Deploy a minimal Lambda + API Gateway with AWS CLI
aws configure
aws iam create-role --role-name hello-role \
  --assume-role-policy-document file://trust.json
aws lambda create-function --function-name hello \
  --runtime python3.12 --role arn:aws:iam::123:role/hello-role \
  --handler app.handler --zip-file fileb://hello.zip
aws apigatewayv2 create-api --name hello-api \
  --protocol-type HTTP --target arn:aws:lambda:us-east-1:123:function:hello`}</Code>
        <Figure src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80" caption="Figure 2 — Enterprise multi-account AWS architecture — VPCs, IAM, Well-Architected pillars, and observability." />
      </Section>

      <Section id="services" title="Core Service Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Domain</th>
                <th className="py-2 pr-4">Service</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Compute</td><td>EC2</td><td>Full VM control, custom OS and workloads.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>Lambda</td><td>Event-driven serverless functions.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>ECS / Fargate</td><td>Managed containers without managing servers.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>EKS</td><td>Managed Kubernetes at scale.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>S3</td><td>Object storage, static hosting, data lakes.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>RDS / Aurora</td><td>Managed relational databases.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>DynamoDB</td><td>Serverless NoSQL at any scale.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>Redshift</td><td>Cloud data warehouse and analytics.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>CloudFront + Route 53</td><td>Global CDN and DNS.</td></tr>
              <tr><td className="py-2 pr-4">Identity</td><td>IAM + Identity Center</td><td>Users, roles, SSO, and least privilege.</td></tr>
              <tr><td className="py-2 pr-4">Ops</td><td>CloudWatch + CloudTrail</td><td>Metrics, logs, and audit trails.</td></tr>
              <tr><td className="py-2 pr-4">AI</td><td>SageMaker + Bedrock</td><td>Train, deploy, and use foundation models.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Startup</b> — Lambda + API Gateway + DynamoDB + S3 for a serverless SaaS MVP.</li>
          <li><b>Enterprise</b> — Multi-account landing zone with Control Tower, TGW hub-and-spoke, and central logging.</li>
          <li><b>Analytics</b> — S3 data lake + Glue + Athena + QuickSight for BI at scale.</li>
          <li><b>Retail</b> — EKS + CloudFront + ElastiCache handle Black Friday traffic spikes.</li>
          <li><b>AI</b> — Bedrock + SageMaker + OpenSearch for RAG and enterprise GenAI.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Apply the Well-Architected Framework — Operational Excellence, Security, Reliability, Performance, Cost, Sustainability.</li>
          <li>Use IAM roles and Identity Center — avoid long-lived access keys.</li>
          <li>Encrypt everywhere with KMS and enforce TLS.</li>
          <li>Use CloudFormation / CDK / Terraform — infrastructure as code is the source of truth.</li>
          <li>Enable CloudTrail, Config, and GuardDuty on every account.</li>
          <li>Set budgets, cost alerts, and use Savings Plans or Reserved Instances.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Using the root user for daily work instead of IAM Identity Center + roles.</li>
          <li>Public S3 buckets and open Security Groups (0.0.0.0/0).</li>
          <li>Deploying single-AZ workloads and calling it "highly available".</li>
          <li>Ignoring cost — leaving idle EC2, NAT, and unattached EBS volumes running.</li>
          <li>Clicking through the Console instead of using IaC.</li>
          <li>Skipping CloudTrail and central logging — no audit, no root cause.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use AWS CloudShell for CLI without local setup.</li>
          <li>Tag every resource — cost allocation, ownership, and lifecycle management depend on it.</li>
          <li>Use Aurora Serverless v2 and Fargate Spot for elastic, cost-efficient workloads.</li>
          <li>Prefer multi-AZ RDS and cross-region S3 replication for critical data.</li>
          <li>Adopt Trusted Advisor and Compute Optimizer recommendations weekly.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Choice</th>
                <th className="py-2 pr-4">Option A</th>
                <th className="py-2 pr-4">Option B</th>
                <th className="py-2">When to Choose</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Compute</td><td>Lambda</td><td>EC2</td><td>Serverless events vs long-running/custom workloads.</td></tr>
              <tr><td className="py-2 pr-4">Containers</td><td>ECS / Fargate</td><td>EKS</td><td>Simpler AWS-native vs full Kubernetes control.</td></tr>
              <tr><td className="py-2 pr-4">Database</td><td>RDS</td><td>DynamoDB</td><td>Relational SQL vs serverless key-value at scale.</td></tr>
              <tr><td className="py-2 pr-4">IaC</td><td>CloudFormation / CDK</td><td>Terraform</td><td>AWS-native tooling vs multi-cloud.</td></tr>
              <tr><td className="py-2 pr-4">Secrets</td><td>Secrets Manager</td><td>SSM Parameter Store</td><td>Rotating credentials vs simple config values.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — right-size instances, use CloudFront + ElastiCache, and choose the closest Region.</li>
          <li><b>Security</b> — least-privilege IAM, KMS encryption, GuardDuty, Security Hub, and VPC endpoints.</li>
          <li><b>Cost</b> — Savings Plans, Spot, S3 Intelligent-Tiering, budgets, and Cost Explorer.</li>
          <li><b>Reliability</b> — multi-AZ / multi-Region, health checks, automated backups, and tested DR runbooks.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>AWS is organized as Organizations → OUs → Accounts → Regions → VPCs → resources.</li>
          <li>IAM + KMS + Secrets Manager form the security foundation.</li>
          <li>Infrastructure as Code (CloudFormation / CDK / Terraform) is non-negotiable at scale.</li>
          <li>Well-Architected pillars keep workloads secure, reliable, performant, and cost-efficient.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a credit card to learn AWS?">The AWS Free Tier requires a card for verification but includes always-free and 12-month-free services for learning.</FAQItem>
        <FAQItem q="Which certification should I start with?">Start with Cloud Practitioner, then Solutions Architect Associate, then a Professional or Specialty track.</FAQItem>
        <FAQItem q="Lambda or EC2?">Lambda for short, event-driven workloads; EC2 (or containers) for long-running or custom-OS applications.</FAQItem>
        <FAQItem q="What is a Landing Zone on AWS?">A pre-provisioned multi-account environment (Control Tower, SCPs, networking, logging) ready to host workloads securely.</FAQItem>
        <FAQItem q="ECS or EKS?">ECS/Fargate for simpler AWS-native container workloads; EKS when you need full Kubernetes portability and ecosystem.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/" target="_blank" rel="noreferrer">AWS Documentation</a> · <a className="text-primary hover:underline" href="https://aws.amazon.com/architecture/well-architected/" target="_blank" rel="noreferrer">Well-Architected Framework</a> · <a className="text-primary hover:underline" href="https://aws.amazon.com/architecture/" target="_blank" rel="noreferrer">Architecture Center</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/ec2/" target="_blank" rel="noreferrer">Amazon EC2</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/s3/" target="_blank" rel="noreferrer">Amazon S3</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/vpc/" target="_blank" rel="noreferrer">Amazon VPC</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/lambda/" target="_blank" rel="noreferrer">AWS Lambda</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/eks/" target="_blank" rel="noreferrer">Amazon EKS</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/ecs/" target="_blank" rel="noreferrer">Amazon ECS</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/rds/" target="_blank" rel="noreferrer">Amazon RDS</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/IAM/" target="_blank" rel="noreferrer">AWS IAM</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/AmazonCloudWatch/" target="_blank" rel="noreferrer">Amazon CloudWatch</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/cli/" target="_blank" rel="noreferrer">AWS CLI</a> · <a className="text-primary hover:underline" href="https://aws.amazon.com/sdk-for-python/" target="_blank" rel="noreferrer">AWS SDK</a> · <a className="text-primary hover:underline" href="https://skillbuilder.aws/" target="_blank" rel="noreferrer">AWS Skill Builder</a> · <a className="text-primary hover:underline" href="https://docs.aws.amazon.com/AWSCloudFormation/" target="_blank" rel="noreferrer">CloudFormation</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. AWS services and pricing evolve rapidly — always consult the latest official AWS documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
