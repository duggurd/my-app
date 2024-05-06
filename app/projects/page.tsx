import { allProjects, Project } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Projects() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">Projects</h1>
            <ul>
                {allProjects.map((project: Project) => {
                return (
                    <Link
                        key={project._raw.flattenedPath} 
                        href={project._raw.flattenedPath}>
                        <li>
                            <h2 className="text-2xl">{project.title}</h2>
                        </li>
                    </Link>
                    )
                })}
            </ul>

        </div>
    )     
}