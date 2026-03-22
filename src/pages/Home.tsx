import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";
import { PostForm } from "@/features/posts/components/PostForm";
import { Timeline } from "@/features/posts/components/Timeline";


export function Home() {
  return (
    <>
      <Header />

      <div className="2xl:hidden flex justify-center px-3 py-2 border-b border-[#E2E8F0] dark:border-[#62748E] bg-[#FAFAFA] dark:bg-[#070B14]">
        <SearchInput className="w-[640px]" />
      </div>

      <main className="bg-[#FAFAFA] min-h-[calc(100vh-65px)] p-3 md:p-0 flex justify-center dark:bg-[#070B14]">
        <div className="mt-9 w-[640px]">
          <PostForm />

          <div className="mt-8 flex flex-col gap-8">
            <Timeline />
          </div>


        </div>
      </main>

      <footer className="py-4 px-10 pt-[80px] bg-[#FAFAFA] dark:bg-[#070B14]">
        <h2 className="text-primary text-lg font-bold dark:text-white">Mini Twitter</h2>
      </footer>
    </>
  )
}