import { ModeToggle } from "@/components/theme/ModeToggle"

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full h-full items-center">

      <ModeToggle />

      <div>This is the home page</div>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/">Home</a>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/sign-in">Sign in</a>
      <a className="border-1 w-fit px-3 py-2 rounded-xl" href="/sign-up">Sign up</a>

    </div>
  );
}
