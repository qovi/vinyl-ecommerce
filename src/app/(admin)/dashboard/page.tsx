import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import DashboardContent from "../dashboardContent";

export default async function Dashboard() {
    const session = await auth()

    if(!session?.user) {
        redirect("/")
    }

    return <DashboardContent user={session.user} />
}