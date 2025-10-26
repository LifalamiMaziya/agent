'use client';

import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    {
      name: 'Hobby',
      price: '0',
      period: 'Free',
      features: [
        '20 generations / month',
        'Core components',
        'Community access',
        'Code export',
      ],
    },
    {
      name: 'Pro',
      price: '449',
      period: '/month',
      features: [
        'Unlimited generations',
        'Advanced & private components',
        'Priority support',
        'Version history',
        'Team collaboration',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'Dedicated support & SLA',
        'On-premise deployment',
        'Custom integrations',
        'Security & compliance reviews',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-foreground">
            Flexible pricing for teams of all sizes
          </h2>
          <p className="text-base text-muted font-light max-w-xl mx-auto leading-relaxed">
            Choose the plan that&apos;s right for your next project. All plans include a free trial period.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-background p-10 group hover:bg-subtle transition-all duration-200 ${
                plan.highlighted ? 'bg-subtle' : ''
              }`}
            >
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted mb-4 tracking-wider uppercase">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light tracking-tight text-foreground">
                    {plan.price !== 'Custom' ? `R${plan.price}` : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted font-light">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <button
                className={`w-full py-2.5 mb-8 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm ${
                  plan.highlighted
                    ? 'bg-accent text-white hover:bg-accent-hover'
                    : 'border border-border hover:border-foreground/20 hover:bg-surface'
                }`}
              >
                {plan.name === 'Hobby' ? 'Start for Free' : (plan.name === 'Pro' ? 'Start 14-day Trial' : 'Contact Sales')}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm text-muted font-light leading-relaxed"
                  >
                    <span className="text-accent mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted/80 font-light">
            Need more? Check out our documentation or contact us for a custom plan.
          </p>
        </div>
      </div>
    </section>
  );
}
