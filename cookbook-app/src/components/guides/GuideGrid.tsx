import GuideCard from "./GuideCard";

type Guide = {
  id: string;
  title: string;
  image: string;
};

export default function GuideGrid({ guides }: { guides: Guide[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {guides.map((guide) => (
        <GuideCard
          key={guide.id}
          id={guide.id}
          title={guide.title}
          image={guide.image}
        />
      ))}
    </div>
  );
}