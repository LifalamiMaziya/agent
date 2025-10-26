'use client';

export default function Dashboard() {
  const projects = [
    { name: 'Marketing Site', updated: '2m ago' },
    { name: 'Dashboard UI', updated: '5m ago' },
    { name: 'Landing Page', updated: '1h ago' },
    { name: 'Admin Panel', updated: '3h ago' },
  ];

  return (
    <section id="dashboard" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-foreground">
            Dashboard
          </h2>
          <p className="text-base text-muted font-light max-w-xl leading-relaxed">
            Manage all your AI-generated projects in one place
          </p>
        </div>

        <div className="border border-border rounded-sm overflow-hidden bg-surface">
          {/* Dashboard Header */}
          <div className="border-b border-border px-6 py-4 bg-subtle flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium text-foreground tracking-wide">Projects</h3>
              <span className="text-xs text-muted font-light">{projects.length} total</span>
            </div>
            <button className="px-4 py-1.5 bg-accent text-white text-xs font-medium tracking-wide hover:bg-accent-hover transition-colors duration-200 rounded-sm">
              New Project
            </button>
          </div>

          {/* Dashboard Table Header */}
          <div className="grid grid-cols-9 gap-4 px-6 py-3 bg-subtle border-b border-border text-xs font-medium text-muted/80 tracking-wider uppercase">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Updated</div>
          </div>

          {/* Dashboard Rows */}
          <div>
            {projects.map((project, index) => (
              <div
                key={index}
                className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-border hover:bg-subtle transition-all duration-200 group cursor-pointer"
              >
                <div className="col-span-6 text-sm font-light text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.name}
                </div>
                <div className="col-span-3 text-sm font-light text-muted/60">
                  {project.updated}
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Footer */}
          <div className="px-6 py-4 bg-subtle border-t border-border flex items-center justify-between">
            <div className="text-xs text-muted/60 font-light">
              Last synced 1 minute ago
            </div>
            <button className="text-xs text-muted hover:text-foreground transition-colors duration-200 font-light">
              View All Projects →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
