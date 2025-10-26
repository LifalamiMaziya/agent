export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free',
      features: [
        '10 generations / month',
        'Core components',
        'Community access',
        'Code export',
      ],
    },
    {
      name: 'Professional',
      price: '49',
      period: '/month',
      features: [
        'Unlimited generations',
        'Advanced components',
        'Priority support',
        'Version control',
        'Team collaboration',
        'Custom systems',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Professional',
        'Dedicated support',
        'SLA guarantees',
        'Custom integrations',
        'On-premise deployment',
        'Custom AI training',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-foreground">
            Pricing
          </h2>
          <p className="text-base text-muted font-light max-w-xl leading-relaxed">
            Transparent pricing for teams of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
          {plans.map((plan, index) => (
            <div
              key={index}
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
                    {plan.price !== 'Custom' ? `$${plan.price}` : plan.price}
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
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Trial'}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm text-muted font-light leading-relaxed"
                  >
                    <span className="text-accent mt-0.5">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted/80 font-light">
            All plans include a 14-day trial period. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
