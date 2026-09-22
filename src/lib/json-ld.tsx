type JsonLdProps = {
  data: object;
};

// Script tag, not next/script: JSON-LD is data, not executable code, so it
// should render synchronously in <head>/<body> with no load strategy.
// The </script>-breakout escape follows Next's own JSON-LD guide.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
