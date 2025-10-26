'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const examplePrompts = [
  "Build a modern landing page",
  "Create a dashboard interface",
  "Design a pricing section",
  "Generate a contact form",
];

export default function Hero() {
  const [prompt, setPrompt] = useState('');
  const [placeholder, setPlaceholder] = useState(examplePrompts[0]);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = examplePrompts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % examplePrompts.length;
        return examplePrompts[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log('Submitting prompt:', prompt);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
      <div className="max-w-4xl mx-auto w-full">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-foreground">
            Build with AI
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto font-light leading-relaxed">
            Production-ready code from natural language
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isFocused
                  ? 'shadow-[0_0_0_2px_rgba(207,19,16,0.6),0_0_32px_rgba(207,19,16,0.25)]'
                  : 'shadow-lg'
              }`}
              style={{ backgroundColor: 'var(--input-bg)' }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 px-6 py-5">
                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={placeholder}
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-white/40 outline-none resize-none text-[15px] font-normal tracking-wide py-2"
                  style={{ minHeight: '32px', maxHeight: '200px' }}
                />

                {/* Mic/Send button */}
                <button
                  type={prompt.trim() ? 'submit' : 'button'}
                  className="flex-shrink-0 w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                >
                  {prompt.trim() ? (
                    // Send icon
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/90">
                      <path d="M10 3L10 17M10 3L14 7M10 3L6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    // Microphone icon
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/70">
                      <rect x="7.5" y="3" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 10C5 11.6569 6.34315 13 8 13H12C13.6569 13 15 11.6569 15 10M10 13V17M10 17H7M10 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.form>

        <motion.div
          className="flex justify-center gap-4 mt-10 text-xs text-muted font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-muted/60">Try:</span>
          {['Dashboard', 'Landing', 'Pricing'].map((example, index) => (
            <motion.button
              key={example}
              onClick={() => setPrompt(`Create a ${example.toLowerCase()} interface`)}
              className="hover:text-foreground transition-colors duration-200 px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
