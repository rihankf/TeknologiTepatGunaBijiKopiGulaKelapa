interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow = "",
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div className={`section-heading ${isLeft ? "section-heading-left" : "section-heading-center"}`}>
      {eyebrow && (
        <div className="section-eyebrow-wrapper">
          <span className="section-eyebrow-badge">{eyebrow}</span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
