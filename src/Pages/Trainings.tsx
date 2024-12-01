import React from "react";

const videos = [
  {
    url: "https://youtu.be/UhXL_rj6wmI",
    title: "Understanding Gender-Based Violence",
    description:
      "An in-depth look into the causes and effects of gender-based violence.",
  },
  {
    url: "https://youtu.be/piYhv_H53uE",
    title: "Preventing Gender-Based Violence",
    description:
      "Strategies and actions to prevent gender-based violence in our communities.",
  },
  {
    url: "https://youtu.be/3AF9Rjki0DE",
    title: "Support for Victims of Gender-Based Violence",
    description:
      "How to support victims and provide the necessary resources and help.",
  },
  {
    url: "https://youtu.be/kqHBaej2cBA",
    title: "Gender-Based Violence Awareness",
    description:
      "Raising awareness about gender-based violence and its impact on society.",
  },
  {
    url: "https://youtu.be/KTvSfeCRxe8",
    title: "Gender-Based Violence in Conflict Zones",
    description:
      "Exploring the challenges and risks of gender-based violence in conflict zones.",
  },
  {
    url: "https://youtu.be/3AF9Rjki0DE",
    title: "Understanding Gender-Based Violence",
    description:
      "An in-depth look into the causes and effects of gender-based violence.",
  },
  {
    url: "https://youtu.be/kqHBaej2cBA",
    title: "Preventing Gender-Based Violence",
    description:
      "Strategies and actions to prevent gender-based violence in our communities.",
  },
  {
    url: "https://youtu.be/KTvSfeCRxe8",
    title: "Support for Victims of Gender-Based Violence",
    description:
      "How to support victims and provide the necessary resources and help.",
  },
];

const Trainings = () => {
  const getYouTubeThumbnail = (url) => {
    const videoId = url.split("youtu.be/")[1] || url.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">Gender-Based Violence</h1>
        <p className="mb-4">
          Gender-based violence (GBV) refers to harmful acts directed at an
          individual based on their gender. It is rooted in gender inequality,
          the abuse of power, and harmful norms. GBV can have physical, sexual,
          emotional, and economic impacts on individuals and communities. During
          the COVID-19 lockdowns, there was a significant increase in GBV
          incidents due to economic strain, social isolation, and deep-rooted
          patriarchal norms.
        </p>
        <h2 className="text-xl font-bold mb-2">How to Reduce its Effect:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Educate and raise awareness about GBV and its consequences.</li>
          <li>
            Promote gender equality and challenge gender stereotypes and norms.
          </li>
          <li>
            Provide support services for victims, including counseling and legal
            assistance.
          </li>
          <li>
            Encourage bystander intervention and create safe spaces for
            reporting.
          </li>
          <li>
            Advocate for policies and laws that protect against GBV and support
            survivors.
          </li>
        </ul>
        <h2 className="text-xl font-bold mb-2">Recommendations:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Embark on campaigns and sensitization to raise consciousness against
            GBV.
          </li>
          <li>Criminalize all forms of sexual and gender-based violence.</li>
          <li>
            Establish specialized GBV squads and tribunals to handle cases.
          </li>
          <li>
            Provide adequate support during emergencies to prevent economic
            strain.
          </li>
          <li>
            Keep women’s affairs ministries operational during emergencies.
          </li>
          <li>Prosecute law enforcement officers who violate GBV laws.</li>
          <li>
            Address the root cause of GBV by eliminating patriarchal systems in
            society.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <p className="mb-4">{video.description}</p>
            <div className="relative mb-4">
              <img
                src={getYouTubeThumbnail(video.url)}
                alt={video.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainings;
