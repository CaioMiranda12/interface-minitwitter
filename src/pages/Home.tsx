import { Header } from "@/components/Header";
import { PostForm } from "@/features/posts/components/PostForm";
import { Timeline } from "@/features/posts/components/Timeline";


export function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#FAFAFA] min-h-[calc(100vh-65px)] flex justify-center">
        <div className="mt-9 w-[640px]">
          <PostForm />

          <div className="mt-8 flex flex-col gap-8">
            <Timeline />
          </div>


        </div>
      </main>

      <footer className="py-4 px-10 pt-[80px] bg-[#FAFAFA]">
        <h2 className="text-primary text-lg font-bold">Mini Twitter</h2>
      </footer>
    </>
  )
}