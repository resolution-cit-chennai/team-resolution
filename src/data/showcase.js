import p1 from "../assets/showcase/sana-3.webp";
import p2 from "../assets/showcase/camera.webp";
import p3 from "../assets/showcase/edit.webp";
import p4 from "../assets/showcase/DSC01331JPG.webp";

// Edit, add, or remove entries here — the fan layout below adjusts
// automatically to however many cards are in this array.
// `image`: swap the import above (or point straight to a file in /public)
//          for your own work.
// `video`: set true to show a play icon over the thumbnail.
export const SHOWCASE_ITEMS = [
  {
    id: "event-cinematography",
    title: "Takshashila",
    tag: "Video",
    description: "Be a part of CIT's Biggest event of the year from pre-production to post-production",
    image: p1,
    video: true,
  },
  {
    id: "motion-graphics",
    title: "Side Hustle",
    tag: "Design",
    description: "An Opportunity to explore new skills and make your mark in the CIT community.",
    image: p2,
    video: true,
  },
  {
    id: "brand-photography",
    title: "MultiMedia",
    tag: "Photo",
    description: "Not just Camera, Bring your imaginations to life through editing and graphic designing",
    image: p3,
    video: false,
  },
  {
    id: "live-coverage",
    title: "Team Work",
    tag: "Photo",
    description: "Work as a team, explore the unexplored and grow together sharing the knowledge and experience",
    image: p4,
    video: false,
  },
];
