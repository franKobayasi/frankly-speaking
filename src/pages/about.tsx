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
            資深工程師
          </p>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-4">
            零售 SaaS | MarTech | AdTech | 前端基礎建設
          </p>
          
          <div className="about-bio space-y-4">
            <p>
              累積 6 年零售 SaaS 前端與全端開發經驗，主要開發產品範疇涵蓋數據視覺化、MarTech/AdTech 產品。
              同時擔任多項公司前端基礎建設的主要開發與維護人員，熟悉如何透過 AI 導入開發循環提升開發效率。
            </p>
          </div>

          {/* Work Experience Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-dark-primary">
              工作經驗
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-accent pl-4">
                <h3 className="font-medium text-text-primary dark:text-text-dark-primary">
                  資深前端工程師 / 全端工程師
                </h3>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                  91APP（台灣首家上櫃零售 SaaS 公司，股票代碼：6741）
                </p>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-2">
                  2020.03 – 2026.03（6 年）
                </p>
                <ul className="list-disc list-inside text-sm text-text-secondary dark:text-text-dark-secondary space-y-1">
                  <li>官網前台改版：AngularJS → React 遷移，確保業務無中斷</li>
                  <li>數據視覺化：開發多張企業級報表，引進 CubeJS 將開發時程從 2-3 個月縮短至 1 週</li>
                  <li>MarTech/個人化行銷：擴充圈選條件、實作 Email 模組、串接 LINE LON 廣告</li>
                  <li>條件模組化：重新設計圈選引擎架構，開發效率提升一倍</li>
                  <li>AdTech：串接 Google、DV360 廣告平台，實現自動投放與數據回傳</li>
                  <li>基礎設施：從零建立公司 UI 元件庫（Atmos-ui）、建立 client-side log 收集方案（Agatha）、維護 Tracking SDK</li>
                  <li>AI 輔助開發：建立 AGENT.md/SKILL.md 規範，透過 MCP 整合 Figma 與任務看板</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-dark-primary">
              技術專長
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">NestJS</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">GCP</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">GraphQL</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">CubeJS</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">AI/LLM</span>
              <span className="px-3 py-1 bg-accent/20 text-accent dark:bg-[#3b82f6]/20 dark:text-[#60a5fa] rounded-full text-sm">MCP</span>
            </div>
          </div>

          <div className="social-links">
            <a 
              href="https://github.com/franKobayasi" 
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
              href="https://www.linkedin.com/in/frank-lin-045993235/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-text-dark-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="mailto:alinktofrank@gmail.com" 
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
              歡迎聯繫合作、討論技術或交流想法！
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
