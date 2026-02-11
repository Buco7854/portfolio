export default function RichText({ html }: { html: string }) {
  if (!html) return null;
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
