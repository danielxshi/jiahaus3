// components/project/ProjectGrid.tsx
import React from 'react'
import styles from './ProjectGrid.module.scss'

interface Project {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: {
    url: string
  }
}

const columnSpans = [5, 3, 3, 5, 3, 3, 2]

const ProjectGrid: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className={`${styles.grid} gap-y-8`}>
    {projects.map((project, index) => (
      <div
        key={project.id}
        className={`${styles.gridItem} gap-y-8`}
        style={{ gridColumn: `span ${columnSpans[index % columnSpans.length]}` }}
      >
        <div className="flex flex-col">
          <img
            src={project.image?.url}
            alt={project.subtitle || project.title}
            className={styles.image}
          />
          <div className={`${styles.text} mt-4 flex justify-between`}>
            <h3>{project.title}</h3>
            <div className="flex flex-col">
              <h4>{project.subtitle}</h4>
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default ProjectGrid
