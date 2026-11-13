
import "./About.css";

const advantages = [
  {
    title: "Design-led approach",
    description: "Thoughtful layouts and visual consistency.",
  },
  {
    title: "Modern React technology",
    description: "Built on a modern, scalable frontend framework.",
  },
  {
    title: "Streamlined development",
    description: "An efficient process from brief to launch.",
  },
  {
    title: "Professional finish",
    description: "Responsive, polished and performance-focused websites.",
  },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">

        <div className="about__head">
          <h2 className="about__title">
            What is <em>RMT?</em>
          </h2>

          <p className="about__subtitle">
            A smarter way to build your website.
          </p>
        </div>

        <div className="about__body">
          <p className="about__text">
            RMT (React Material Template) is a streamlined website development solution, brought to life by Team Verligte. We love good design, smart technology and turning ideas into engaging digital experiences. Combining creative thinking, modern React technology and our proven development framework, we build responsive, professionally designed websites around your business and its goals. We work smarter, move faster and make every website count.
          </p>


          <div className="about__advantage">
            <h3>The RMT Advantage.</h3>

            <ul className="about__features">
              {advantages.map((item) => (
                <li key={item.title} className="about__feature">
                  <img
                      src="/images/check-box.png"
                      alt=""
                      className="about__bullet"
                    />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
