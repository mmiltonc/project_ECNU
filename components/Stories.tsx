"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

const styles = css`
  width: 300px;
  height: 450px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .frame {
    font-family: var(--font-jost);
    font-weight: 400;
    font-size: 20px;
    line-height: 1;
    padding: 12px 18px;
    width: 100%;
    height: 100%;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background: linear-gradient(
        to bottom,
        #05142280 0%,
        #05142240 15%,
        transparent 25%
      );
    }

    .controls {
      position: relative;
      z-index: 1001;

      .timeline {
        height: 2px;
        display: flex;
        gap: 8px;
        margin-bottom: 10px;

        .scene {
          height: 100%;
          width: 100%;
          background-color: #ffffff70;
          border-radius: 8px;
          overflow: hidden;

          .time {
            height: 100%;
            width: 0;
            background-color: #ffffff;
            transition: width 2000ms linear;

            &.active {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .story {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 200ms ease;

    &.active,
    &.first {
      opacity: 1;
    }

    .story-wrapper {
      display: contents;
    }

    .story-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .story-caption {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 12px 18px;
      background: #05142280;
      padding: 4px 20px;
    }

    .story-quote {
      width: 100%;
      height: 100%;
      background-color: #051422dd;
      padding: 90px 40px 24px 53px;
      font-family: var(--font-nunito-sans);
      font-size: 34px;
      font-weight: 600;

      .text {
        position: relative;

        &:before {
          position: absolute;
          font-size: 2em;
          line-height: 0;
          content: "“";
          top: 30px;
          left: -36px;
        }
      }
    }
  }
`;

export type PersonType = {
  name: string;
  quote: string;
  before: string;
  after: string;
  id: number;
};

export type StoryProps = {
  id: number;
  content: Object;
}

export type StoriesProps = {
  stories: StoryProps[];
  person: PersonType;
  finish?: Function;
  triggerId?: number;
};


const Stories = (props: StoriesProps) => {
  const { person, finish, triggerId, stories } = props;
  const [activeStory, setActiveStory] = useState(0);
  const [finished, setFinished] = useState(false);
  const [run, setRun] = useState(false);



  const handleTrigger = () => !run && setRun(true);

  useEffect(() => {
    if (finished) return;
    if (!run) return;
    const timer = setTimeout(() => {
      const reachEndStory = activeStory < stories?.length - 1;
      if (reachEndStory) return setActiveStory(activeStory + 1);
      setFinished(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeStory, stories?.length, run, finish]);

  useEffect(() => {
    if (triggerId !== person.id) return;
    handleTrigger();
  }, [triggerId, person.id, run]);

  useEffect(() => {
    if (!finished) return;
    if(finish) finish(person.id + 1);
  }, [finished]);

  return (
    <div css={styles} className="stories" onMouseOver={handleTrigger}>
      <div className="frame">
        <div className="controls">
          <div className="timeline">
            {stories?.map(({ id }) => (
              <div key={id} className="scene">
                <div
                  className={classNames("time", {
                    active: run && id <= activeStory,
                  })}
                />
              </div>
            ))}
          </div>
          <span className="name">{person.name}</span>
        </div>
        <ul>
          {stories?.map(({ id, content }) => (
            <li
              key={id}
              className={classNames("story", {
                active: id === activeStory,
                first: id === 0,
              })}
            >
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stories;
