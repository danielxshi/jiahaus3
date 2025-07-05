import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <h2 className="font-mono text-small leading-none pb-4 uppercase tracking-widest opacity-50">
    {children}
  </h2>
);

export default SectionLabel;
