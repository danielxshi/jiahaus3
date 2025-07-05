import React from "react";
import styles from "./ProjectGrid.module.scss";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Work",
    subtitle: "Thorne: Find Your Way",
    description: "The path to wellness looks different for everyone.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/5340b24668fb310be281a5de6ae94f50ce367f43-4305x2871.jpg?w=1400&q=95&auto=format",
  },
  {
    id: 2,
    title: "Work",
    subtitle: "Notion: Think It. Make It.",
    description: "Think it. Make it.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/3516d74f51a00b44d3905fa473940fb3f6cd9f95-5760x3572.png?w=1400&q=95&auto=format",
  },
  {
    id: 3,
    title: "Work",
    subtitle: "Project Example 3",
    description: "Another example project.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/3516d74f51a00b44d3905fa473940fb3f6cd9f95-5760x3572.png?w=1400&q=95&auto=format",
  },
  {
    id: 4,
    title: "Work",
    subtitle: "Project Example 4",
    description: "Another great project.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/5340b24668fb310be281a5de6ae94f50ce367f43-4305x2871.jpg?w=1400&q=95&auto=format",
  },
  {
    id: 5,
    title: "Work",
    subtitle: "Project Example 5",
    description: "Yet another project.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/3f5786d110e659b6cc48f5aed3dd647c83e8c150-2601x2601.jpg?w=1400&q=95&auto=format",
  },
  {
    id: 6,
    title: "Work",
    subtitle: "Project Example 6",
    description: "A final project to showcase.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/c3865bf8d06cb0aa0dbc2f65c4af7329076de774-2560x2560.png?w=1400&q=95&auto=format",
  },
  {
    id: 7,
    title: "Work",
    subtitle: "Project Example 6",
    description: "A final project to showcase.",
    imageUrl:
      "https://cdn.sanity.io/images/uk7b627p/production/c3865bf8d06cb0aa0dbc2f65c4af7329076de774-2560x2560.png?w=1400&q=95&auto=format",
  },
];

const columnSpans = [5, 3, 3, 5, 3, 3, 2]; // Define fixed column spans for each project

const ProjectGrid: React.FC = () => {
  return (
    <div className={`${styles.grid} gap-y-8`}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`${styles.gridItem} gap-y-8`}
          style={{
            gridColumn: `span ${columnSpans[index % columnSpans.length]}`,
          }} // Fixed pattern
        >
          <div className="flex flex-col">
            <img
              src={project.imageUrl}
              alt={project.subtitle}
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
  );
};

export default ProjectGrid;
