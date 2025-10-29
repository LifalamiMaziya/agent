import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <PageLayout maxWidth="4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Vektra</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl text-muted mb-8">
            We&apos;re building the future of design and development with AI-powered tools that transform ideas
            into production-ready code.
          </p>

          <h2>Our Mission</h2>
          <p>
            At Vektra, we believe that everyone should be able to bring their design ideas to life,
            regardless of their coding expertise. Our mission is to democratize software development by
            making it accessible, efficient, and enjoyable for creators of all skill levels.
          </p>

          <h2>What We Do</h2>
          <p>
            Vektra uses advanced AI technology to generate clean, production-ready code from natural
            language descriptions. Whether you&apos;re a designer looking to prototype quickly, a developer
            wanting to speed up your workflow, or an entrepreneur building your MVP, Vektra helps you
            move faster.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Quality First:</strong> We generate code that follows best practices and industry
              standards.
            </li>
            <li>
              <strong>User-Centric:</strong> Every feature we build is designed with our users&apos; needs in
              mind.
            </li>
            <li>
              <strong>Innovation:</strong> We&apos;re constantly pushing the boundaries of what&apos;s possible with
              AI.
            </li>
            <li>
              <strong>Transparency:</strong> We believe in open communication about how our technology works.
            </li>
          </ul>

          <h2>The Team</h2>
          <p>
            Vektra is built by a team of designers, developers, and AI researchers who are passionate
            about making technology more accessible. We&apos;re backed by leading investors and supported by
            a growing community of creators.
          </p>

          <h2>Join Us</h2>
          <p>
            We&apos;re always looking for talented individuals to join our mission. Check out our{' '}
            <a href="#">careers page</a> to see open positions.
          </p>

          <div className="mt-12 p-8 bg-surface border border-border rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="mb-6">
              Have questions or want to learn more? We&apos;d love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
