import { Reveal } from "@/components/ui/Reveal";

/**
 * The one way a homepage section introduces itself: eyebrow, serif
 * heading, gold rule, optional lead. Sections differ below the fold of
 * this block, never inside it — that sameness is what makes eight
 * sections read as one page.
 *
 * `title` takes a node, not a string, so each heading can set one phrase
 * in `.text-metal` (the styleguide allows one per section, no more).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
}) {
  const centred = align === "center";

  return (
    <Reveal
      className={
        centred ? "flex flex-col items-center text-center" : "max-w-2xl"
      }
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-h2 mt-5 max-w-3xl font-light text-balance">
        {title}
      </h2>
      <div className={`rule-gold mt-7 ${centred ? "mx-auto" : ""}`} />
      {lead && (
        <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">{lead}</p>
      )}
    </Reveal>
  );
}
