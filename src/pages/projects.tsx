import Head from 'next/head'
import Header from '../components/Header'

interface ProjectsPageProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const projects = [
  {
    id: '1',
    title: 'Personal Blog',
    description: 'A minimalist blog built with Next.js, featuring tag filtering, dark mode, and a clean typography-focused design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A productivity application for managing daily tasks with drag-and-drop functionality and real-time sync.',
    tags: ['React', 'Firebase', 'Redux'],
    link: 'https://github.com'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A beautiful weather application showing forecasts with animated backgrounds and location-based recommendations.',
    tags: ['Vue.js', 'OpenWeather API', 'Chart.js'],
    link: 'https://github.com'
  },
  {
    id: '4',
    title: 'CLI Productivity Tools',
    description: 'A collection of command-line utilities for automating common development tasks and boosting productivity.',
    tags: ['Go', 'CLI', 'Automation'],
    link: 'https://github.com'
  }
]

export default function ProjectsPage({ darkMode, toggleDarkMode }: ProjectsPageProps) {
  return (
    <>
      <Head>
        <title>Projects | Blog</title>
        <meta name="description" content="My projects and portfolio" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <div className="projects-page">
          <h1 className="text-2xl font-bold mb-6 text-text-primary dark:text-text-dark-primary">
            Projects
          </h1>
          <p className="text-text-secondary dark:text-text-dark-secondary mb-8">
            Here are some of the projects I've worked on. Check out my GitHub for more!
          </p>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="project-title">{project.title}</h2>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary"
                  >
                    View →
                  </a>
                </div>
                <p className="project-description mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="article-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
