import { cookies, cookies as requestCookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import ApiDashboard from "@/components/api/dashboard"
import ApiLogs from "@/components/api/date"

import { Database } from "../../types/database"

export default async function User() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let content = null
  let section = ""

  if (session === null) {
    redirect("/login")
  } else {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_id", session?.user.id)
      .single()

    if (!userProfile) {
      redirect("/what-are-you-doing")
    } else if (userProfile.auth_id !== session.user.id) {
      redirect("/what-are-you-doing")
    } else {
      content = (
        <main className="min-h-screen flex flex-col justify-start items-center py-10 w-full px-5">
          <ApiDashboard auth_id={session.user.id} current_page="home" />
          <ApiLogs auth_id={session.user.id} />
        </main>
      )
    }
  }

  return content
}
