import { allProjects, Project } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";

type Props = {
    params: {
        slug: string
    };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
    return allProjects
      .map((p) => ({
        slug: p._raw.flattenedPath.split("/")[1],
      }));
  }

  
export default function Project({ params }: Props) {
    const slug = params?.slug;
    console.log(slug);

    allProjects.map((proj) => console.log(proj?._raw.flattenedPath));
    const project = allProjects.find((project) => project._raw.flattenedPath.split("/")[1] === slug)
    
    console.log(project?._raw.flattenedPath);
    if (!project) {
        notFound();
    };

    return (
        <Mdx code={project.body.code} />
    )
}