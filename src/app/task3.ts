interface Tour {
  readonly name: string;
  readonly duration: number;
  readonly description: string;
  readonly childfriendly: boolean;
}

const tours: readonly Tour[] = [
  {
    name: "City Tour",
    duration: 120,
    description: "Explore the city's landmarks and hidden gems with our expert guides.",
    childfriendly: true,
  },
  {
    name: "Nature Hike",
    duration: 180,
    description: "Immerse yourself in the beauty of nature with our guided hikes through scenic trails.",
    childfriendly: false,
  },
  {
    name: "Cultural Experience",
    duration: 90,
    description: "Discover the rich culture and traditions of the region with our immersive cultural tours.",
    childfriendly: true,
  },
];

function filterChildFriendlyTours(tours: readonly Tour[]): Tour[] {
  return tours.filter((tour) => tour.childfriendly);
}

const childFriendlyTours = filterChildFriendlyTours(tours);
console.log("Child-friendly tours:", childFriendlyTours);

type TourNameandDuration = Readonly<{
  name: string;
  duration: number;
}>;

function getTours(tours: readonly Tour[]): readonly TourNameandDuration[] {
  return tours.map((tour) => ({
    name: tour.name,
    duration: tour.duration,
  }));
}

const tourNamesList = getTours(tours);
console.log("Tour names:", tourNamesList);