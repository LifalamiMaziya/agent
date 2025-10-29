import PageLayout from '@/components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout maxWidth="4xl">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Introduction</h2>
        <p>
          Welcome to Vektra. We respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you about how we look after your personal data and tell you about
          your privacy rights.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect and process the following types of information:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and password</li>
          <li><strong>Usage Data:</strong> Information about how you use our service</li>
          <li><strong>Project Data:</strong> Code and designs you create using Vektra</li>
          <li><strong>Technical Data:</strong> IP address, browser type, and device information</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Notify you about changes to our service</li>
          <li>Provide customer support</li>
          <li>Monitor usage and improve our service</li>
          <li>Detect and prevent technical issues</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal data. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request transfer of your data</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@vektra.com">privacy@vektra.com</a>
        </p>
      </div>
    </PageLayout>
  );
}
