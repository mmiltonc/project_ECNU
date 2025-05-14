"use client";
import Stories, { PersonType, StoryProps } from "@/components/Stories";
import { desktop, fontSize1, fontSize2, space } from "@/styles/global";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";

const styles = css`
  padding: 0 ${space(3)} 0;

  ${desktop(css`
    padding: 160px ${space(10)} 0;
  `)}

  .title {
    ${fontSize2};
    font-family: var(--font-jost);
    font-weight: 900;
    margin-bottom: 72px;

    ${desktop(css`
      ${fontSize1};
  `)}
  }

  .people-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }
`;

const people = [
  {
    id: 0,
    name: "Zequi",
    quote: "Lucas me enseñó confiar en mi potencial, es un gran guía.",
    before: require("@/public/images/before_after/before_ezequiel.jpg"),
    after: require("@/public/images/before_after/after_ezequiel.jpg"),
  },
  {
    id: 1,
    name: "Lean",
    quote:
      "Su enfoque mejora el rendimiento físico y la mentalidad para superar cualquier desafío.",
    before: require("@/public/images/before_after/before_leandro.jpg"),
    after: require("@/public/images/before_after/after_leandro.jpg"),
  },
  {
    id: 2,
    name: "Juano",
    quote:
      "Entendió mis necesidades, encontré una gran ayuda en él y una actividad apasionante.",
    before: require("@/public/images/before_after/before_juan.jpg"),
    after: require("@/public/images/before_after/after_juan.jpg"),
  },
  {
    id: 3,
    name: "Esteban",
    quote:
      "Me ayudó a encaminar mis objetivos y también la manera de plantearlos a largo plazo.",
    before: require("@/public/images/before_after/before_esteban.jpg"),
    after: require("@/public/images/before_after/after_esteban.jpg"),
  },
  {
    id: 4,
    name: "Germán",
    quote:
      "Gracias a nuestros encuentros virtuales entendí que una mente fuerte logra objetivos físicos.",
    before: require("@/public/images/before_after/before_german.jpg"),
    after: require("@/public/images/before_after/after_german.jpg"),
  },
];

const Changes = () => {
  const [triggerPersonId, setTriggerPersonId] = useState(-1);
  const buildPeopleFigure = (person: PersonType) => {
    const stories: StoryProps[] = [
      {
        id: 0,
        content: (
          <Image className="story-image" src={person.after} alt={person.name} />
        ),
      },
      {
        id: 1,
        content: (
          <div className="story-wrapper">
            <Image
              className="story-image"
              src={person.before}
              alt={person.name}
            />
            <span className="story-caption">Antes</span>
          </div>
        ),
      },
      {
        id: 2,
        content: (
          <div className="story-quote">
            <p className="text">{person.quote}</p>
          </div>
        ),
      },
    ];

    return (
      <li className="people-item" key={person.name}>
        <Stories
          stories={stories}
          person={person}
          triggerId={triggerPersonId}
          finish={(id: number) => setTriggerPersonId(id % people.length)}
        />
      </li>
    );
  };

  return (
    <section css={styles} className="section-changes" id="cambios-visibles">
      <h2 className="title">CAMBIOS VISIBLES</h2>
      <ul className="people-list">{people.map(buildPeopleFigure)}</ul>
    </section>
  );
};

export default Changes;
