import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

// Linked from the Sampada Google Play listing, so the URL must stay stable.
// Source text lives in assets-src/projects/invoice-app/sampada-privacy-policy.md.

const EFFECTIVE_DATE = "October 4, 2026";
const CONTACT_EMAIL = "prabinsingh750@gmail.com";

export const metadata: Metadata = {
  title: "Sampada Privacy Policy",
  description:
    "How the Sampada invoicing and bookkeeping app collects, uses, shares and protects your information.",
  alternates: { canonical: "/sampada/privacy-policy" },
};

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 border-b border-line pb-3 text-xl font-semibold text-fg sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-muted">{children}</p>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-fg">{children}</strong>;
}

function List({ items, ordered }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`mt-4 flex flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted ${
        ordered ? "list-decimal" : "list-disc"
      }`}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-xl border-collapse text-left text-sm">
        <thead className="bg-surface">
          <tr>
            {head.map((h) => (
              <th key={h} className="border-b border-line px-4 py-3 font-semibold text-fg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 align-top leading-relaxed ${j === 0 ? "text-fg" : "text-muted"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-2">
      {children}
    </a>
  );
}

const email = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-fg underline underline-offset-2">
    {CONTACT_EMAIL}
  </a>
);

export default function SampadaPrivacyPolicyPage() {
  return (
    <Container as="section" className="py-16 lg:py-24">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-fg sm:text-4xl">Sampada Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">
          Effective date: {EFFECTIVE_DATE} · Prabin Singh Thakuri
        </p>

        <H2 id="introduction">1. Introduction</H2>
        <P>
          This Privacy Policy explains what information the Sampada mobile app (&ldquo;Sampada&rdquo;, &ldquo;the
          app&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, how we use and share it, and the choices you
          have. It applies to the Sampada Android app and the Sampada servers it connects to.
        </P>
        <P>
          Sampada is an invoicing, billing and bookkeeping app for small and medium businesses in Nepal. It is
          published by <B>Prabin Singh Thakuri</B>, based in Nepal.
        </P>
        <P>By using Sampada you agree to this policy. If you do not agree, please do not use the app.</P>
        <P>
          <B>Effective date:</B> {EFFECTIVE_DATE}
        </P>

        <H2 id="information-we-collect">2. Information We Collect</H2>
        <P>
          We collect only what the app needs to create invoices, keep your books and keep your account secure. You
          can use Sampada in guest mode without an account; in that case your data stays on your device and is not
          sent to our servers.
        </P>
        <Table
          head={["Category", "What we collect", "Source", "Required?"]}
          rows={[
            [
              "Account information",
              "Name, mobile phone number, email address (optional), password (stored only as a one-way hash), team role (Owner, Cashier, Accountant, Order Taker)",
              "You",
              "Phone and password required to create an account",
            ],
            [
              "Business information",
              "Business name, address, PAN/VAT number, registration status, fiscal year setting, business type, logo, signature image, payment QR image, bank account name, number and branch",
              "You",
              "Business name required; the rest optional",
            ],
            [
              "Records you create",
              "Invoices, credit notes, payments, items and stock, expenses, suppliers, purchase bills, fixed assets, journal entries",
              "You",
              "Needed for the app to work",
            ],
            [
              "Your customers' and suppliers' details",
              "Name, phone, email, address, PAN/VAT number of people and businesses you bill or buy from",
              "You",
              "Optional, entered by you",
            ],
            [
              "Device identifier",
              "An app-generated device ID used to lock each account to one device",
              "App",
              "Required for signed-in use",
            ],
            [
              "App usage analytics",
              'Screens viewed and in-app actions (for example, "invoice created"), your role and business type, approximate country, device model, OS version, app version, and an app-instance identifier',
              "Google Analytics for Firebase",
              "Automatic",
            ],
            [
              "Photos",
              "Images you choose from your gallery (logo, signature, payment QR, invoice attachments)",
              "You",
              "Optional",
            ],
          ]}
        />
        <P>
          <B>What we do not collect:</B> precise location, contacts, call logs, SMS, or payment card data. Sampada
          does not process payments; a customer who pays by scanning your QR code pays through their own wallet or
          bank app.
        </P>
        <P>
          <B>Camera:</B> the barcode scanner uses your camera only to read a barcode on your device. Camera images
          are not stored or uploaded.
        </P>
        <P>
          <B>Analytics limits:</B> we never send customer names, phone numbers, PAN/VAT numbers, invoice numbers or
          business names to analytics.
        </P>

        <H2 id="how-we-use">3. How We Use Your Information</H2>
        <P>
          We use your information only to run and improve Sampada. We do not sell your data and we do not use it
          for advertising.
        </P>
        <List
          items={[
            <>
              <B>Provide the service:</B> create, number, store and sync invoices and other records; generate invoice
              PDFs and reports; back up your data so it survives a reinstall or a new phone.
            </>,
            <>
              <B>Meet tax rules:</B> assign sequential invoice numbers and keep records in the format Nepal&rsquo;s
              VAT rules require.
            </>,
            <>
              <B>Secure your account:</B> sign you in, enforce team roles, limit each account to one device, and
              block repeated failed login attempts.
            </>,
            <>
              <B>Support you:</B> reply when you contact us, including password-reset help over WhatsApp.
            </>,
            <>
              <B>Improve the app:</B> use aggregated analytics to understand which features are used and where the
              app needs fixing.
            </>,
            <>
              <B>Legal obligations:</B> comply with applicable law and respond to lawful requests from authorities.
            </>,
          ]}
        />
        <P>
          <B>Offline use:</B> records you create offline are stored on your device first and sent to our servers
          when you are back online.
        </P>

        <H2 id="sharing">4. How We Share Information and Third-Party Services</H2>
        <P>
          We do not sell or rent your personal information. We share it only with the service providers below, who
          process it on our behalf to run the app, and only as much as they need.
        </P>
        <Table
          head={["Purpose", "Data involved", "Privacy policy"]}
          rows={[
            [
              "App usage analytics (Google Analytics for Firebase)",
              "Usage events, device and app info, app-instance ID",
              <A key="g" href="https://policies.google.com/privacy">Google</A>,
            ],
            [
              "Database hosting, to store and back up your records",
              "Account, business and record data",
              <A key="m" href="https://www.mongodb.com/legal/privacy">MongoDB</A>,
            ],
            [
              "Server hosting, to run the app's API",
              "All data sent between the app and our servers",
              <A key="r" href="https://render.com/privacy">Render</A>,
            ],
            [
              "Image storage, for images shown on invoices",
              "Logo, signature and payment QR images",
              <A key="c" href="https://www.cloudflare.com/privacypolicy/">Cloudflare</A>,
            ],
            [
              "Customer support and invoice sharing by chat",
              "Only what you choose to send",
              <A key="w" href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp</A>,
            ],
          ]}
        />
        <P>
          These providers may store data on servers outside Nepal. We choose providers that protect data with
          industry-standard security.
        </P>
        <P>
          <B>Images are publicly reachable by link.</B> Your business logo, signature and payment QR image are
          stored at an unlisted web address so they can appear on the invoices you share. Anyone who has that
          address can view the image.
        </P>
        <P>
          <B>Sharing you start.</B> When you share an invoice by WhatsApp, email or another app, that app&rsquo;s
          own privacy policy applies to what you send.
        </P>
        <P>
          <B>Your team.</B> If you add team members, they can see business records according to their role.
        </P>
        <P>
          <B>Legal reasons.</B> We may disclose information if required by law, court order or a lawful request from
          a government authority, such as Nepal&rsquo;s Inland Revenue Department.
        </P>
        <P>
          <B>Business transfer.</B> If Sampada is merged or sold, your information may transfer to the new owner
          under this policy, and we will notify you first.
        </P>

        <H2 id="retention">5. Data Retention</H2>
        <P>We keep your data only as long as needed for the purposes in this policy or as the law requires.</P>
        <Table
          head={["Data", "How long we keep it"]}
          rows={[
            [
              "Account and business profile",
              "While your account is active; deleted within 30 days of a deletion request, except as below",
            ],
            [
              "Invoices, credit notes, payments and other accounting records",
              "6 years from the end of the fiscal year they belong to, as Nepal's VAT and income tax rules require",
            ],
            ["Customer and supplier details on those records", "Same as the records they appear on"],
            ["Analytics data", "Up to 14 months in Google Analytics, then deleted automatically"],
            ["Server security logs", "Up to 90 days"],
            ["Guest-mode data", "On your device only, until you clear app data or uninstall"],
          ]}
        />
        <P>When the retention period ends, we delete the data or make it anonymous.</P>

        <H2 id="deletion">6. Account and Data Deletion</H2>
        <P>You can ask us to delete your account and data at any time.</P>
        <List
          ordered
          items={[
            <>
              Email {email} from the email address on your account, or message our support on WhatsApp from the
              app&rsquo;s Help menu, with the subject &ldquo;Delete my account&rdquo;.
            </>,
            "Include your business name and the mobile number you sign in with.",
            "We will confirm your identity and complete the deletion within 30 days.",
          ]}
        />
        <P>
          <B>What we delete:</B> your user account, business profile, uploaded images, customer and supplier lists,
          items, and analytics data linked to your app instance.
        </P>
        <P>
          <B>What we must keep:</B> issued invoices, credit notes and related accounting records are kept for 6
          years as required by Nepal tax law (see Section 5). They are kept securely, used for nothing else, and
          deleted when that period ends.
        </P>
        <P>
          <B>Team members:</B> an Owner can remove a team member&rsquo;s access at any time from the Team screen.
        </P>
        <P>
          <B>Guest mode:</B> data you created without an account is only on your device. Uninstalling the app or
          clearing its data deletes it.
        </P>
        <P>
          You can also ask for a copy of your data before deletion. Reports and invoices can be exported as PDF from
          within the app.
        </P>

        <H2 id="security">7. Data Security</H2>
        <P>
          All data sent between the app and our servers is encrypted in transit using HTTPS. Passwords are stored
          only as salted one-way hashes. Access is controlled by sign-in tokens, team roles and a one-device lock
          per account, and login attempts are rate-limited.
        </P>
        <P>
          No system is perfectly secure. If a breach affects your personal data, we will notify you as required by
          law.
        </P>

        <H2 id="children">8. Children&rsquo;s Privacy</H2>
        <P>
          Sampada is a business tool for adults. It is not directed to children under 13, or under 16 where local
          law sets a higher age, and we do not knowingly collect personal information from them. This is consistent
          with the US Children&rsquo;s Online Privacy Protection Act (COPPA).
        </P>
        <P>If you believe a child has given us personal information, contact us at {email} and we will delete it promptly.</P>

        <H2 id="rights">9. Your Rights and Choices</H2>
        <P>Depending on where you live, you may have the right to:</P>
        <List
          items={[
            <>
              <B>Access</B> the personal information we hold about you.
            </>,
            <>
              <B>Correct</B> it. Most details can be edited in the app under Business Profile and Settings.
            </>,
            <>
              <B>Delete</B> it, subject to the legal retention in Section 5.
            </>,
            <>
              <B>Object to or limit</B> certain processing, such as analytics.
            </>,
            <>
              <B>Withdraw consent</B> where processing is based on consent.
            </>,
          ]}
        />
        <P>To use any of these rights, email {email}. We will reply within 30 days.</P>
        <P>
          You can revoke the app&rsquo;s photo or camera permission at any time in your Android settings. You can
          reset your Android advertising ID or opt out of personalization in your device&rsquo;s Google settings.
        </P>

        <H2 id="changes">10. Changes to This Policy</H2>
        <P>
          We may update this policy from time to time. We will post the new version in the app and at this page and
          update the effective date. For significant changes, we will notify you in the app before they take effect.
        </P>

        <H2 id="contact">11. Contact Us</H2>
        <P>For questions about this policy or your data:</P>
        <List
          items={[
            <>
              <B>Developer:</B> Prabin Singh Thakuri
            </>,
            <>
              <B>Email:</B> {email}
            </>,
            <>
              <B>Phone / WhatsApp:</B> +977 9866498278
            </>,
            <>
              <B>Location:</B> Nepal
            </>,
          ]}
        />
      </article>
    </Container>
  );
}
