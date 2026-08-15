import { redirect } from "next/navigation";
import { requireUser, USING_DEFAULT_CREDS } from "@/lib/auth";
import { LoginPanel } from "@/components/dashboard/LoginPanel";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await requireUser();
  if (user) redirect("/dashboard");
  return <LoginPanel showHint={USING_DEFAULT_CREDS} />;
}
