import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Calculator, 
  GitBranch, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const sections = [
    {
      id: 'testing',
      title: 'Testing Formulas & Coverage Metrics (Weeks 10 - 12)',
      icon: <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      items: [
        {
          term: 'Cyclomatic Complexity V(G)',
          detail: 'Measures independent paths in a program graph:',
          formula: 'V(G) = E - N + 2P',
          notes: [
            'For single component (P = 1): V(G) = E - N + 2',
            'Alternative formula: V(G) = P + 1 (where P = number of predicate / decision nodes)',
            'Alternative formula: V(G) = Number of bounded regions + 1',
          ]
        },
        {
          term: 'MC/DC Coverage (Modified Condition / Decision Coverage)',
          detail: 'Safety-critical testing standard (DO-178C). Each condition must independently affect the decision outcome.',
          formula: 'Minimum Test Cases = N + 1 (for N atomic conditions)',
          notes: [
            'Example: if ((p > 10) && (q < 50)) has N = 2 conditions → 3 test cases required.',
            'Example: decision with 3 conditions → 3 + 1 = 4 test cases required.',
          ]
        },
        {
          term: 'Condition Coverage Hierarchy',
          detail: 'Comparison between white-box structural testing criteria:',
          notes: [
            'Statement Coverage: Every line executed at least once.',
            'Branch / Decision Coverage: Every decision outcome (True and False) evaluated at least once.',
            'Basic Condition Coverage: Each atomic condition evaluated to True and False at least once (does not imply branch coverage).',
            'Multiple Condition Coverage: All 2^N combinations of condition outcomes tested.',
          ]
        },
        {
          term: 'Mutation Testing',
          detail: 'Evaluates test suite adequacy by creating mutant programs with small syntactic faults.',
          formula: 'Mutation Score = Killed Mutants / (Total Mutants - Equivalent Mutants)',
          notes: [
            'Equivalent Mutants: Mutants having identical behavior to the original program. Cannot be killed by any test case and are notoriously hard to detect automatically.',
            'Major challenge: High computational cost of executing large mutant suites.',
          ]
        },
        {
          term: 'Equivalence Class Testing (Triangle Problem)',
          detail: 'Partitioning input space into valid and invalid equivalence classes:',
          notes: [
            'Valid classes for triangleType(a, b, c): 3 classes (Equilateral, Isosceles, Scalene) or 4 including Not a Triangle.',
            'Exhaustive functional testing: Product of all valid inputs across fields (e.g. 5 subjects × 3 difficulties × 4 types = 60 test cases).',
          ]
        }
      ]
    },
    {
      id: 'design',
      title: 'Software Design: Cohesion & Coupling Scales (Weeks 5 - 6)',
      icon: <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      items: [
        {
          term: 'Cohesion Scale (From Best / Desirable to Worst)',
          detail: 'Internal strength and single-purpose focus of a module:',
          notes: [
            '1. Functional Cohesion (HIGHEST & BEST): Module performs exactly one single problem-related function.',
            '2. Sequential Cohesion: Output from one part serves as input to the next part.',
            '3. Communicational Cohesion: Operations execute on the same input data or produce same output data.',
            '4. Procedural Cohesion: Functions grouped because they follow a specific execution order.',
            '5. Temporal Cohesion: Activities performed at roughly the same time (e.g. initialization).',
            '6. Logical Cohesion: Activities in the same logical category (e.g. all mouse/keyboard input handling).',
            '7. Coincidental Cohesion (LOWEST & WORST): Random parts grouped with no meaningful relation.',
          ]
        },
        {
          term: 'Coupling Scale (From Best / Lowest to Worst / Highest)',
          detail: 'Degree of interdependence between two software modules (Goal: LOW coupling):',
          notes: [
            '1. Data Coupling (BEST / LOWEST): Modules communicate solely by passing simple primitive data parameters.',
            '2. Stamp Coupling: Modules share a composite data structure, even if only parts are used.',
            '3. Control Coupling: One module passes a flag or parameter controlling the internal logic of another.',
            '4. External Coupling: Modules share an externally imposed format or protocol.',
            '5. Common Coupling: Modules share global data or global variables.',
            '6. Content Coupling (WORST / HIGHEST): One module modifies or relies on the internal implementation of another.',
          ]
        }
      ]
    },
    {
      id: 'uml',
      title: 'UML & Object-Oriented Relationships (Weeks 7 - 9)',
      icon: <GitBranch className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      items: [
        {
          term: 'Aggregation vs. Composition',
          detail: 'Both model "has-a" relationships, but differ fundamentally in ownership and lifecycle:',
          notes: [
            'Aggregation (Hollow Diamond ♢): Weak whole-part. Part has independent lifecycle and can exist without the whole (e.g. Department and Teacher).',
            'Composition (Filled Diamond ◆): Strong whole-part. Whole owns parts; parts cannot exist independently. When whole is destroyed, parts are destroyed (e.g. Window and Frame, Car and Wheels).',
          ]
        },
        {
          term: 'Use Case Relationships: «include» vs. «extend»',
          detail: 'Behavior factoring in Use Case Diagrams:',
          notes: [
            '«include»: Mandatory execution. Base use case ALWAYS invokes included use case (e.g. Place Order includes Validate Payment). Helps reduce duplication.',
            '«extend»: Optional / conditional execution. Base use case can complete on its own. Extending use case runs ONLY under specified extension points/conditions (e.g. Withdraw Cash extended by Print Receipt).',
          ]
        },
        {
          term: 'Sequence Diagrams & Lifelines',
          detail: 'Dynamic interaction modeling over time:',
          notes: [
            'Vertical dashed line: Object Lifeline.',
            'Thin rectangle on lifeline: Activation / Focus of Control (when object is actively processing).',
            'Horizontal arrows: Messages / method invocations.',
            'Objects placed at the top of the diagram.',
          ]
        },
        {
          term: 'CRC Cards & Boundary Classes',
          detail: 'Object-Oriented Analysis & Domain Modeling guidelines:',
          notes: [
            'CRC: Class, Responsibilities, Collaborators.',
            'Boundary Classes: Model communication interfaces between system and external actors (screens, forms, APIs). Do NOT handle persistent database storage.',
            'Rule of thumb: Boundary classes ≈ Actor-Use Case interactions.',
          ]
        }
      ]
    },
    {
      id: 'process',
      title: 'Process Models, Agile & Estimation (Weeks 0 - 4)',
      icon: <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      items: [
        {
          term: 'Classical Waterfall vs. Agile',
          detail: 'Predictive vs. adaptive development lifecycles:',
          notes: [
            'Waterfall: Document-driven, rigid phases, testing occurs only at the end. High maintenance costs if requirements change.',
            'Spiral Model: Risk-driven; each cycle involves objective setting, risk assessment, development, and customer review.',
            'Scrum: Sprints (2-4 weeks), Sprint Backlog owned by dev team (frozen during sprint), Daily Scrum (15 min standup), Product Owner owns Product Backlog.',
          ]
        },
        {
          term: 'COCOMO (Constructive Cost Model)',
          detail: 'Algorithmic cost estimation by Barry Boehm:',
          formula: 'Effort = a * (KLOC)^b [Person-Months]',
          notes: [
            'Organic: Small team, familiar domain, flexible environment (a=2.4, b=1.05).',
            'Semidetached: Medium team, mixed experience, intermediate constraints (a=3.0, b=1.12).',
            'Embedded: Stringent regulations, tight hardware constraints, complex interactions (a=3.6, b=1.20).',
          ]
        },
        {
          term: 'Fault vs. Error vs. Failure',
          detail: 'IEEE standard dependability definitions:',
          notes: [
            'Error (Mistake): Human action that produces an incorrect result (e.g. developer misunderstands spec).',
            'Fault (Bug / Defect): An incorrect step, process, or data definition in software source code.',
            'Failure: Observable incorrect runtime behavior (e.g. system freezes, invalid output, crash). Testing directly observes failures.',
          ]
        }
      ]
    }
  ];

  const filteredSections = sections.map(sec => {
    if (!filterQuery.trim()) return sec;
    const q = filterQuery.toLowerCase();
    const matchingItems = sec.items.filter(
      item => item.term.toLowerCase().includes(q) ||
              item.detail.toLowerCase().includes(q) ||
              (item.notes && item.notes.some(n => n.toLowerCase().includes(q)))
    );
    return { ...sec, items: matchingItems };
  }).filter(sec => sec.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Last-Minute Revision</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            High-Yield Software Engineering Formula & Concept Sheet
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Key formulas, metric scales, UML rules, and coverage standards for quick reading before entering the exam.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            placeholder="Search formula: V(G), MC/DC..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {filteredSections.map(sec => (
          <div 
            key={sec.id}
            className="rounded-2xl bg-white dark:bg-stone-850 p-5 sm:p-7 border border-stone-200 dark:border-stone-750 shadow-2xs space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              {sec.icon}
              <h3 className="font-bold text-base text-stone-900 dark:text-white">
                {sec.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sec.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/70 dark:border-stone-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900 dark:text-white">
                      {item.term}
                    </span>
                    {item.formula && (
                      <code className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-semibold">
                        {item.formula}
                      </code>
                    )}
                  </div>

                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                    {item.detail}
                  </p>

                  {item.notes && item.notes.length > 0 && (
                    <ul className="space-y-1 pt-1">
                      {item.notes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
                          <span className="leading-relaxed">{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
