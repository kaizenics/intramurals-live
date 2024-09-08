
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import pageant from "@/assets/images/hcdc-pageant.jpg";
import bballWomen from "@/assets/images/basketball-women.jpg";
import sing from "@/assets/images/sing-1.jpg";
import esports from "@/assets/images/esports.jpg";
import dance from "@/assets/images/dance.jpg";
import danceSport from "@/assets/images/dance-2.jpg";

export const About = () => {
  return (
   <>
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[25rem] mb-6">
      {items.map((item, i) => (
       <BentoGridItem
       key={i}
       title={item.title}
       description={item.description}
       header={
        <div className="relative w-full h-full">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-xl"
          />
        </div>
      }
       className={item.className} 
       icon={item.icon}
     />
      ))}
    </BentoGrid>
    </>
  );
}


const items = [
    {
      title: "Basketball Women Preliminaries",
      description: "Catch the action",
      imageSrc: bballWomen,
      imageAlt: "Age of Enlightenment concept image",
      className: "md:col-span-2",
      icon: <IconClipboardCopy className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "The Newly Crowned Queen",
      description: "Witness the crowning of the new queen of the night.",
      imageSrc: pageant,
      imageAlt: "Newly crowned queen image",
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Vocal Solo Competition",
      description: "Listen to the sweet melodies of the night.",
      imageSrc: sing,
      imageAlt: "Art of Design concept image",
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Mobile Legends: Bang Bang - Esports",
      description: "Experience the thrill of the game.",
      imageSrc: esports,
      imageAlt: "Power of Communication concept image",
      className: "md:col-span-2",
      icon: <IconTableColumn className="h-4 w-4 text-gray-400" />,
    },
    {
      title: "Pinoy Folk Dance Competition",
      description: "Watch the graceful movements of the dancers.",
      imageSrc: dance,
      imageAlt: "Future of Technology concept image",
      className: "md:col-span-2",
      icon: <IconTableColumn className="h-4 w-4 text-gray-400" />,
    },
    {
        title: "Dance Sport Latin Competition",
        description: "Watch the graceful movements of the dancers.",
        imageSrc: danceSport,
        imageAlt: "Future of Technology concept image",
        className: "md:col-span-1",
        icon: <IconTableColumn className="h-4 w-4 text-gray-400" />,
      },
  ];