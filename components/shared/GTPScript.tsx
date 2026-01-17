import Script from "next/script";

interface GTMScriptProps {
  src: string;
  gtmId: string;
  apiKey: string;
}

export const GTMScript = ({ src, gtmId, apiKey }: GTMScriptProps) => {
  const twoSS = btoa(`id=${gtmId}`);

  const script = `
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s);
                    j.async=true;
                    j.src="${src}?2ss=${twoSS}&apiKey=${apiKey}";
                    f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','2ss=${twoSS}&apiKey=${apiKey}');
                    `;

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Google Tag Manager Script personalizado */}
      <Script id="custom-tags" strategy="beforeInteractive">
        {script}
      </Script>
    </>
  );
};
