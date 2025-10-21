import Link from "next/link";

type GuideCardProps = {
  id: string;
  title: string;
  image: string;
};

export default function GuideCard({ id, title, image }: GuideCardProps) {
  return (
    <Link href={`/guides/${id}`}>
      <div className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-3">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}