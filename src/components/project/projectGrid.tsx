'use client'

import React from 'react'
import Link from 'next/link'
import styles from './ProjectGrid.module.scss'

interface Project {
  id: string
  slug: string
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
        <Link href={`/projects/${project.slug}`} className="block hover:opacity-80 transition-all">
          <div className="flex flex-col">
            {project.image?.url && (
              <img
                src={project.image.url}
                alt={project.subtitle || project.title}
                className={styles.image}
              />
            )}
            <div className={`${styles.text} mt-4 flex justify-between`}>
              <h3>{project.title}</h3>
              <div className="flex flex-col">
                <h4>{project.subtitle}</h4>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
)

export default ProjectGrid
