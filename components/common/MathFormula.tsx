import { InlineMath } from 'react-katex';

export default function HomePage() {
    const formula = String.raw`\sum_{i \in D} V_{i}^2 \quad \text{where} \quad V_{i} = \sum_{j \in \text{HCC}} (V_{j} * I_{j})`;  
  return (
    <div>
      <InlineMath math={formula} />
    </div>
  );
}