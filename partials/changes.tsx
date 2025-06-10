"use client";
import Stories, { PersonType, StoryProps } from "@/components/Stories";
import { useMediaQuery } from "@/hooks/use-media-query";
import { desktop, fontSize1, fontSize2, space } from "@/styles/global";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import classNames from "classnames";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const styles = css`
  overflow-x: hidden;
  width: 100%;
  padding: ${space(3)} ${space(3)} ${space(3)};

  ${desktop(css`
    padding: ${space(20)} ${space(10)} ${space(10)};
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

    .people-item {
      transition: all 300ms ease;
    }

    &.isMobile {
      position: relative;
      width: 300px;
      height: 450px;
      overflow: hidden;
      margin: 0 auto 72px;

      .people-item {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;

        &.active {
          z-index: 1;
        }

        &.before {
          transform: translateX(-100%);
        }

        &.after {
          transform: translateX(100%);
        }
      }
    }
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [storiesStates, setStoriesStates] = useState(
    {} as { [key: string]: boolean }
  );

  const [stillTriggering, setStillTriggering] = useState(true);

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
      <li
        className={classNames([
          "people-item",
          { active: person.id === triggerPersonId },
          { after: person.id > triggerPersonId },
          { before: person.id < triggerPersonId },
        ])}
        key={person.name}
      >
        <Stories
          stories={stories}
          person={person}
          triggerId={triggerPersonId}
          back={() =>
            setTriggerPersonId(
              (triggerPersonId + people.length - 1) % people.length
            )
          }
          next={() => setTriggerPersonId((triggerPersonId + 1) % people.length)}
          finish={(id: number) =>
            stillTriggering && setTriggerPersonId(id % people.length)
          }
        />
      </li>
    );
  };

  useEffect(() => {
    const ids = Object.keys(people);
    const states = ids.reduce((prev, curr) => {
      return { ...prev, [curr]: false };
    }, {});
    setStoriesStates(states);
  }, []);

  useEffect(() => {
    const personId = (triggerPersonId + people.length) % people.length;

    if (triggerPersonId < 0) return;
    setStoriesStates({
      ...storiesStates,
      [personId]: true,
    });
  }, [setStoriesStates, triggerPersonId]);

  useEffect(() => {
    if (!isMobile) return;
    if (!isInView) return;
    setTriggerPersonId(0);
  }, [isInView, setTriggerPersonId]);

  useEffect(() => {
    if (!isInView) return;
    const ids: string[] = Object.keys(people);
    const st = ids.filter((id) => !storiesStates[id])?.length > 0;
    setStillTriggering(st);
  }, [isInView, setTriggerPersonId, storiesStates]);

  return (
    <section css={styles} className="section-changes" id="cambios-visibles">
      <h2 className="title">CAMBIOS VISIBLES</h2>
      <ul ref={ref} className={classNames(["people-list", { isMobile }])}>
        {people.map(buildPeopleFigure)}
      </ul>
    </section>
  );
};

export default Changes;
