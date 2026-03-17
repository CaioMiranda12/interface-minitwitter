import { CiHeart } from "react-icons/ci";

interface PostProps {
  title: string
  content: string
  image?: string | null
  authorId: string
  createdAt: string
  authorName: string
  likesCount: number
}

export function Post({ title, content, image, authorId, createdAt, authorName, likesCount }: PostProps) {
  return (
    <div className="bg-white shadow-md border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-3">
      <header className="flex items-center gap-1.5">
        <h3 className="text-[#314158] font-bold text-base">{authorName}</h3>
        <span className="text-twitterGray font-normal text-sm">@{authorName.toLowerCase().replace(' ', '')}</span>
        <span className="text-twitterGray font-normal text-sm">.</span>
        <span className="text-twitterGray font-normal text-sm">{createdAt}</span>
      </header>

      <main>
        <p className="mb-1 text-[#314158] font-bold text-lg">{title}</p>
        <p className="text-[#314158] font-normal text-base">
          {content}
        </p>

        {image && <div className="w-full h-[200px] bg-gray-700 my-3 rounded-lg"></div>}

        <div className="flex items-center gap-1">
          <CiHeart size={24} color="red" />
          <span>{likesCount}</span>
        </div>
      </main>
    </div>
  )
}