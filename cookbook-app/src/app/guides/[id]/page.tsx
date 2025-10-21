interface Guide {
  id: string;
  title: string;
  image: string;
  description: string;
  steps: string[];
}

/* used if no guide is found */
const theNullGuide: Guide = {
  id: "0",
  title: "Guide Not Found",
  image: "/assets/noFood.jpg",
  description: "We couldn’t find a guide with this ID.",
  steps: [
    "Try going back to the Guides page.",
    "Choose another tutorial.",
    "also Google works :)"
  ]
};

/* temporary hard-coded guide data */
const guides: Guide[] = [
  {
    id: "1",
    title: "How to Mince Onions",
    image: "/assets/mince_onions_guide.jpeg",
    description:
      "Learn to mince onions efficiently while keeping your fingers safe and your cuts consistent.",
    steps: [
      "Peel off the outer skin of the onion.",
      "Cut the onion in half through the root.",
      "Make horizontal cuts almost to the root.",
      "Make vertical cuts across the onion.",
      "Slice downward to create fine, even minced pieces.",
    ],
  },
  {
    id: "2",
    title: "Boiling Pasta Perfectly",
    image: "/assets/boil_pasta_guide.jpg",
    description:
      "Get perfect al dente pasta every time with these simple steps.",
    steps: [
      "Fill a large pot with water and bring to a boil.",
      "Add salt generously to the water.",
      "Add the pasta and stir occasionally.",
      "Check the pasta 1 minute before the package time.",
      "Drain and toss with sauce immediately.",
    ],
  },
  {
    id: "3",
    title: "Knife Safety Basics",
    image: "/assets/knife_safety_guide.jpg",
    description:
      "Learn the fundamentals of knife safety to avoid accidents and improve your cutting technique.",
    steps: [
      "Always use a stable cutting board.",
      "Keep your fingers curled under (the ‘claw grip’).",
      "Use sharp knives—dull ones are more dangerous.",
      "Never leave knives in a sink or under dishes.",
      "Clean and dry knives immediately after use.",
    ],
  },
];

/* helper to look up a guide by id */
async function getGuide(id: string): Promise<Guide> {
  const guide = guides.find((g) => g.id === id);
  return guide || theNullGuide;
}

/* main component */
export default async function GuidePage({ params }: { params: { id: string }; }) {
  const { id } = await params;
  const guide = await getGuide(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
        {guide.title}
      </h1>

      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-2/3 h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
        {guide.description}
      </p>

      {/* Steps */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Steps
      </h2>
      <ol className="list-decimal list-inside space-y-2">
        {guide.steps.map((step, idx) => (
          <li
            key={idx}
            className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
