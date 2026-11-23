import { Problem } from "@/types";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="problem-card-v2">
      <div className="problem-card-header">
        <div className="problem-card-icon-wrap" role="img" aria-label={`Ikon ${problem.title}`}>
          <span className="problem-card-icon" aria-hidden="true">
            {problem.icon}
          </span>
        </div>
        <span className="problem-card-tag">Identifikasi Kendala</span>
      </div>

      <h3 className="problem-card-title">{problem.title}</h3>

      <div
        className="problem-card-desc"
        dangerouslySetInnerHTML={{ __html: problem.description }}
      />

      <div className="problem-card-impact">
        <div className="problem-impact-header">
          <span className="problem-impact-badge" aria-hidden="true">
            !
          </span>
          <strong className="problem-impact-label">Dampak Lapangan</strong>
        </div>
        <p className="problem-impact-text">{problem.impact}</p>
      </div>
    </article>
  );
}
