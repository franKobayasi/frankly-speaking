import Head from 'next/head'
import Header from '../components/Header'

interface AboutPageProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function AboutPage({ darkMode, toggleDarkMode }: AboutPageProps) {
  return (
    <>
      <Head>
        <title>About | Blog</title>
        <meta name="description" content="About the author" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <div className="about-page">
          <h1 className="about-name">Frank Lin</h1>
          <p className="text-lg text-text-secondary dark:text-text-dark-secondary mb-4">
            Software Developer & Technical Writer
          </p>
          
          <div className="about-bio space-y-4">
            <p>
              Hi! I'm a software developer based in Taiwan with a passion for building 
              elegant solutions to complex problems. I specialize in web development 
              with a focus on React, TypeScript, and modern JavaScript frameworks.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or writing about my experiences 
              in the tech industry.
            </p>
            <p>
              I believe in continuous learning and sharing knowledge with the 
              community. This blog is my way of documenting my journey and 
              helping others who are on a similar path.
            </p>
          </div>

          <div className="social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-text-dark-primary" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-text-dark-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="mailto:hello@example.com" 
              className="social-link"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
            <h2 className="text-lg font-semibold mb-4 text-text-primary dark:text-text-dark-primary">
              Get in Touch
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Feel free to reach out for collaborations, questions, or just to say hi! 
              I'm always open to discussing new projects and ideas.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
