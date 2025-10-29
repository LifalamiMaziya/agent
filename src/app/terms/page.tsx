import PageLayout from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout maxWidth="4xl">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using Vektra, you agree to be bound by these Terms of Service and all applicable
          laws and regulations. If you do not agree with any of these terms, you are prohibited from using
          this service.
        </p>

        <h2>Use License</h2>
        <p>
          We grant you a limited, non-exclusive, non-transferable license to use Vektra for your personal
          or commercial projects, subject to these Terms of Service.
        </p>

        <h3>You may:</h3>
        <ul>
          <li>Use the service to generate code for your projects</li>
          <li>Use the generated code in commercial applications</li>
          <li>Modify and customize the generated code</li>
        </ul>

        <h3>You may not:</h3>
        <ul>
          <li>Reverse engineer or attempt to extract the source code of our AI models</li>
          <li>Use the service to generate harmful or illegal content</li>
          <li>Share your account credentials with others</li>
          <li>Abuse or overload our service infrastructure</li>
        </ul>

        <h2>User Content</h2>
        <p>
          You retain all rights to the code and designs you create using Vektra. We do not claim ownership
          of your generated content.
        </p>

        <h2>Service Availability</h2>
        <p>
          We strive to keep Vektra available at all times, but we do not guarantee uninterrupted access.
          We may suspend or terminate the service for maintenance, updates, or other reasons.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Vektra is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages
          arising from your use of the service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of significant
          changes via email or through the service.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at{' '}
          <a href="mailto:legal@vektra.com">legal@vektra.com</a>
        </p>
      </div>
    </PageLayout>
  );
}
