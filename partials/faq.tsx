"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  desktop,
  fontSize1,
  fontSize2,
  fontSize3,
  fontSize4,
  fontSize5,
  fontSize6,
  space,
} from "@/styles/global";
import faq from "../public/data/faq.json";
import classNames from "classnames";
import { useState } from "react";

const styles = css`
  padding: ${space(6)} ${space(3)};
  background-color: var(--white-color);
  color: var(--background-color);

  ${desktop(css`
    padding: ${space(10)};
  `)}

  .title {
    ${fontSize2};
    font-family: var(--font-jost);
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: ${space(3)};

    ${desktop(css`
      ${fontSize1};
      margin-bottom: ${space(6)};
    `)}
  }

  .filters {
    display: flex;
    gap: ${space(0.5)};
    margin-bottom: ${space(2)};

    .filter-button {
      ${fontSize6};
      text-transform: uppercase;
      color: var(--secondary-color);
      border: 1px solid var(--secondary-color);
      padding: ${space(0.5)} ${space(1)};
      border-radius: ${space(3)};

      ${desktop(css`
        ${fontSize5};
      `)}

      &.active {
        font-weight: 600;
        color: var(--background-color);
        border-color: var(--background-color);
      }
    }
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: ${space(6)};

    .faq-item {
      .question {
        ${fontSize4};
        font-weight: 600;
        font-family: var(--font-owsald);
        margin-bottom: ${space(1)};
      }

      .answer {
        ${fontSize4};
        font-family: var(--font-owsald);
      }
    }
  }
`;

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("Todo");
  const categories = [
    "Todo",
    ...Array.from(new Set(faq.map(({ category }) => category).sort())),
  ];

  const handleFilters = (category: string) => {
    setActiveCategory(activeCategory === category ? "Todo" : category);
  };

  const filterQuestionsByCategory = ({ category }: { category: string }) =>
    activeCategory === "Todo" || category === activeCategory;

  const buildFilterButtons = (category: string) => (
    <button
      key={category}
      className={classNames([
        "filter-button",
        category.toLowerCase(),
        { active: category === activeCategory },
      ])}
      onClick={() => handleFilters(category)}
    >
      {category}
    </button>
  );
  return (
    <section css={styles} className="faq" id="preguntas-frecuentes">
      <h2 className="title">Preguntas Frecuentes</h2>
      <div className="filters">{categories.map(buildFilterButtons)}</div>
      <div className="faq-list">
        {faq.filter(filterQuestionsByCategory).map((data) => (
          <article className="faq-item" key={data.id}>
            <h3 className="question">{data.question}</h3>
            <p className="answer">{data.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Faq;
