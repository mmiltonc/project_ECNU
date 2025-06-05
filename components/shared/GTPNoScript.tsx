interface GTMNoScriptProps {
  src: string;
  gtmId: string;
}

export const GTMNoScript = ({ src, gtmId }: GTMNoScriptProps) => {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Noscript fallback */}
      <noscript>
        <iframe
          src={`${src}?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
};
