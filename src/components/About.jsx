import { CONFIG } from '../config.js'

export default function About() {
  const { bio, skills } = CONFIG.about
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section__title">About Me</h2>
        <p className="section__lead">{bio}</p>

        <div className="about__skills">
          {skills.map((skill) => (
            <span key={skill} className="skill-chip">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
