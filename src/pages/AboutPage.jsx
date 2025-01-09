import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-us-container">
      <h1 className="title about-us-title">About Us</h1>
      <div className="section-1">
        <div className="member">
          <h2 className="member-title">Sven Andersson</h2>

          <p className="paragraph">
            Living in Barcelona since 20 years ago, originally from
            Sweden. Professionally I have been working with a lot of things
            related to the digital world of marketing and ecommerce and for the
            last 5 years I have also been working as a test manager in a DevOps
            Team. Last year I decided to learn more about developing and coding,
            that's how I ended up in Ironhack and in this learning project
            creating a mock up ecommerce using React as frontemd and Supabase as
            backend. Nuevo 19:32 In my spare time I enjoy outdoor sports like
            skiing, running and trekking. Also really like to both eat and cook
            great food whenever there is time for that. Last but not least I try
            to play some musical instrument like Ukulele and Guitar. I will for
            sure buy my next guitar from Git-Arr =D
          </p>
        </div>

        <div className="member">
          <h2 className="member-title">Èric Masip</h2>

          <p className="paragraph">
            I started in the world of music at the age of 3. I have
            studied and worked as a violinist for more than two decades,
            developing skills such as resilience, attention to detail, and
            teamwork. After that, I worked for 6 years as a music teacher in
            secondary school and high school, an experience that strengthened my
            communication, leadership, and conflict resolution abilities.
            Currently, I have found my passion in web development. Thanks to
            Ironhack's bootcamp, I became a Fullstack MERN Developer, acquiring
            knowledge in technologies such as HTML, CSS, JavaScript, Node.js,
            React, Git/GitHub, OOP, TDD, and MongoDB. My goal is to continue
            learning, exploring, and creating high-quality solutions.
            Personally, I'm passionate about board games 🎲, anime 🎎👘, Latin
            dances 💃, and homemade baking 🍪.
          </p>
        </div>
        <div className="member">
          <h2 className="member-title">Roxana Ferramola</h2>

          <p className="paragraph">
            I'm Venezuelan, and I've lived in Barcelona for six years. I
            love hiking, practicing yoga, and exploring new places. I'm
            passionate about food, especially traditional Venezuelan dishes like
            arepas and empanadas, but I also enjoy cooking Thai recipes. My
            interest in technology led me to discover programming, which I find
            both logical and creative. Nature is a big part of my life, and I
            love traveling, whether near or far, as it allows me to experience
            new cultures and create lasting memories.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
