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
  <div className={`${styles.grid} gap-y-8 md:grid `}>
    {projects.map((project, index) => (
      <div
        key={project.id}
        className={`${styles.gridItem} gap-y-8`}
        style={{ gridColumn: `span ${columnSpans[index % columnSpans.length]}` }}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="mb-24 sm:md-0 block hover:opacity-80 transition-all "
        >
          <div className="flex flex-col">
            {project.image?.url && (
              <img
                src={project.image.url}
                alt={project.subtitle || project.title}
                className={`${styles.image} max-h-[90vh] bg-center object-cover`}
              />
            )}
            <div className={`${styles.text} mt-4 flex justify-between mx-0 px-0`}>
              <h3>{project.title}</h3>
              <div className="flex flex-col">
                <h4 className="text-right">{project.subtitle}</h4>
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
