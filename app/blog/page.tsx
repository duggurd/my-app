import { allBlogs, Blog } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Blogs() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">Blog</h1>
            <ul>
                {allBlogs.map((blog: Blog) => {
                return (
                    <li className="rounded-xl p-10 hover:shadow-white hover:shadow-md text-center transition duration-300">
                        <Link
                            key={blog._raw.flattenedPath} 
                            href={blog._raw.flattenedPath}>
                            <h2 className="text-2xl">{blog.title}</h2>
                            <p>{blog.description}</p>
                        </Link>
                    </li>
                    )
                })}
            </ul>

        </div>
    )     
}