import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons/icons"
import { MainNav } from "@/components/navbar/main-nav"
import { ThemeToggle } from "@/components/navbar/theme-toggle"
import { Database } from "@/app/types/database"

import { AuthButtonServer } from "../login/auth-button-server"
import NavbarAvatar from "./navbar-avatar"
import HeaderMobile from "./site-header-mobile"

export async function SiteHeader() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: posts } = await supabase.from("profiles").select("*")

  return (
    <section>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      <div className=" hidden md:block">
      <header className="w-full fixed top-0 left-0 h-16 bg-neutral-800/20 backdrop-blur-lg justify-center px-3 items-center border-b border-white/20 rounded-b-sm   z-50 flex overflow-hidden">
        <div className="w-full max-w-6xl justify-center items-center flex gap-2.5 h-full">
          <a href="/" className="flex gap-2.5 items-center truncate hover:bg-white/10 active:bg-white/20 active:scale-90 p-2.5 rounded-xl false gtransition [&_img]:hover:ml-0 [&_img]:hover:scale-100 [&_img]:hover:blur-none [&_img]:hover:opacity-100">
            <div className="w-8 h-8 aspect-square">
            <img id="a" src="/no_bg_applio_logo.png" className="md:-ml-10 md:scale-75 md:blur md:opacity-0 gtransition" alt="logo"/>
            </div>
            <h1 className="text-2xl font-semibold truncate tracking-tight">Applio</h1>
          </a>
          <div className="flex-grow h-full flex items-center justify-center md:mr-4">
          <MainNav items={siteConfig.mainNav} />
          </div>
          <div >
            <nav >
              <div >
                <AuthButtonServer />
              </div>
            </nav>
          </div>
        </div>
      </header>
      </div>
    </section>
  )
}
