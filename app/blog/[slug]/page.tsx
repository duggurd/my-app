import { allBlogs, Blog } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";

type Props = {
    params: {
        slug: string
    };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
    return allBlogs
      .map((p) => ({
        slug: p._raw.flattenedPath.split("/")[1],
      }));
  }

  
export default function Blog({ params }: Props) {
    const slug = params?.slug;
    console.log(slug);

    allBlogs.map((proj) => console.log(proj?._raw.flattenedPath));
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath.split("/")[1] === slug)
    
    console.log(blog?._raw.flattenedPath);
    if (!blog) {
        notFound();
    };

    return (
        <div className="m-auto p-10 rounded-xl text-white max-w-4xl bg-neutral-950">
            <Mdx code={blog.body.code}/>
        </div>
        
    )
}