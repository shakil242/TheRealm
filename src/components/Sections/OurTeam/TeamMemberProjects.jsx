import React from "react";

const TeamMemberProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Asclepia Key",
      categories: ["Asclepia Key", "The Realm"],
      link: "https://therealmblox.io/portfolio/asclepia-key/",
      img: "https://therealmblox.io/wp-content/uploads/2024/11/Asclepia-main-island-hm-44-scaled.webp",
    },
    {
      id: 2,
      title: "Boardwalk Island",
      categories: ["Boardwalk Island", "The Realm"],
      link: "https://therealmblox.io/portfolio/boardwalk-island/",
      img: "https://therealmblox.io/wp-content/uploads/2024/10/boardwalk-2-scaled.jpg",
    },
    {
      id: 3,
      title: "Grand Island",
      categories: ["Grand Island", "The Realm"],
      link: "https://therealmblox.io/portfolio/grand-island/",
      img: "https://therealmblox.io/wp-content/uploads/2020/10/grand-island-casino1-1.jpg",
    },
  ];

  return (
    <section className="team_member_projects  py-10">
      <h3 className="section_title text-5xl font-bold mb-10 mt-15">
        Projects by Randy Gruber
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden "
          >
            {/* Project Image */}
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-85 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            

            {/* Sliding Info Box */}
            <div className="absolute left-0 bottom-10 w-[75%] p-4 bg-[#0c0c11] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out">
              <h5 className="text-lg font-bold text-white">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                
                >
                  {project.title}
                </a>
              </h5>
              <div className="text-sm text-gray-300">
                {project.categories.join(", ")}
              </div>
            </div>

            {/* Clickable Full Link */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
            ></a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMemberProjects;
