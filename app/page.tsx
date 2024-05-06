"use client"

import Particles from './components/particls'
import { links } from "@/app/components/navigation"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex  h-screen flex-col items-center justify-center p-24 bg-gradient-to-tl from-black from-10% via-zinc-700/20  to-black to-90%">
      <ul className="flex flex-row space-x-5 text-xl my-5">
        {links.map((link) => {
          return (
            <Link href={link.href} className='text-neutral-600 hover:text-neutral-200 transition' key={link.name}>
              <li>
                {link.name}
              </li>
            </Link>
          )
        })}
      </ul>
      
      <div className='flex items-center justify-center'>
        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">alex</h1>
      </div>



      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={30}
      />
      <section>
      </section>
    </main>
  )
}
