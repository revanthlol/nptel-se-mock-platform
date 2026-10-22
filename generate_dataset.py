import glob, re, subprocess, json, os

pdf_files = sorted(glob.glob('ass/*.pdf'), key=lambda x: int(re.search(r'Assignment\s+(\d+)', x).group(1)))

assignment_topics = {
    0: "Software Process Models, Lifecycle & Basics",
    1: "Software Engineering Challenges & Structured Programming",
    2: "Requirements Engineering, Feasibility & SRS",
    3: "Agile Development, Scrum & Extreme Programming",
    4: "Software Estimation, COCOMO & Metrics",
    5: "Software Design, Modularity, Cohesion & Coupling",
    6: "Function-Oriented Design & Data Flow Diagrams (DFD)",
    7: "Object-Oriented Concepts, UML & Use Case Diagrams",
    8: "UML Class Diagrams, Relationships & Sequence Diagrams",
    9: "CRC Cards, Boundary Classes, Faults, Errors & Failures",
    10: "Black-Box Testing, Equivalence Class & Boundary Value Analysis",
    11: "White-Box Testing, Control Flow Graphs & Condition Coverage",
    12: "Path Coverage, Cyclomatic Complexity & Mutation Testing"
}

# Image mapping for diagrams
diagram_mapping = {
    (7, 4): "/diagrams/ass7_q4.png",
    (7, 5): "/diagrams/ass7_q5.png",
    (8, 1): "/diagrams/ass8_q1.png",
    (8, 2): "/diagrams/ass8_q2.png",
    (8, 3): "/diagrams/ass8_q3.png",
    (8, 5): "/diagrams/ass8_q5.png",
    (9, 6): "/diagrams/ass9_q6.png",
}

def clean_pdf_text(t):
    t = re.sub(r'\x0c', '\n', t)
    # Remove header blocks
    t = re.sub(r'NPTEL Online Certification Courses\s*\n\s*Indian Institute of Technology Kharagpur', '', t, flags=re.IGNORECASE)
    t = re.sub(r'Software Engineering\s*\n\s*Assignment-?\d+', '', t, flags=re.IGNORECASE)
    t = re.sub(r'TYPE OF QUESTION:\s*MCQ/MSQ', '', t, flags=re.IGNORECASE)
    t = re.sub(r'Number of questions:\s*\d+', '', t, flags=re.IGNORECASE)
    t = re.sub(r'Total mark:\s*.*?\n', '', t, flags=re.IGNORECASE)
    t = re.sub(r'For each of the following questions one or more of the given options are correct\.\s*Choose the\s*correct options\.', '', t, flags=re.IGNORECASE)
    return t

all_questions = []
global_id = 1

for pdf_path in pdf_files:
    ass_num = int(re.search(r'Assignment\s+(\d+)', pdf_path).group(1))
    txt = subprocess.run(['pdftotext', pdf_path, '-'], capture_output=True, text=True).stdout
    txt = clean_pdf_text(txt)
    
    q_splits = list(re.finditer(r'QUESTION\s+(\d+)\s*:', txt, re.IGNORECASE))
    
    for i, match in enumerate(q_splits):
        q_num = int(match.group(1))
        start_pos = match.end()
        end_pos = q_splits[i+1].start() if i+1 < len(q_splits) else len(txt)
        chunk = txt[start_pos:end_pos].strip()
        
        ans_match = re.search(r'Correct\s+Answer\s*:(.*?)(?:Detailed\s+Solution\s*:|$)', chunk, re.DOTALL | re.IGNORECASE)
        sol_match = re.search(r'Detailed\s+Solution\s*:(.*)$', chunk, re.DOTALL | re.IGNORECASE)
        
        correct_ans_raw = ans_match.group(1).strip() if ans_match else ""
        detailed_sol_raw = sol_match.group(1).strip() if sol_match else ""
        
        # Clean detailed solution
        detailed_sol = re.sub(r'\s+', ' ', detailed_sol_raw).strip()
        
        body = chunk
        if ans_match:
            body = chunk[:ans_match.start()].strip()
            
        lines = body.split('\n')
        
        opt_indices = []
        for l_idx, line in enumerate(lines):
            stripped = line.strip()
            m = re.match(r'^([a-g])[\.\)]\s*(.*)$', stripped, re.IGNORECASE)
            if m:
                opt_indices.append((l_idx, m.group(1).lower(), m.group(2).strip()))
                
        q_text = ""
        opts = []
        if opt_indices:
            first_opt_line = opt_indices[0][0]
            raw_q_lines = [l.strip() for l in lines[:first_opt_line] if l.strip()]
            q_text = " ".join(raw_q_lines)
            for o_i in range(len(opt_indices)):
                cur_line_idx, key, first_text = opt_indices[o_i]
                next_line_idx = opt_indices[o_i+1][0] if o_i+1 < len(opt_indices) else len(lines)
                opt_lines = [first_text] + [lines[x].strip() for x in range(cur_line_idx+1, next_line_idx)]
                opt_full = " ".join([x for x in opt_lines if x]).strip()
                opts.append({"key": key, "text": opt_full})
        else:
            q_text = re.sub(r'\s+', ' ', body).strip()
            
        # Parse correct answer keys
        raw_keys = re.findall(r'(?:^|[\s,;])([a-g])(?:[\.\)]|\s|$)', correct_ans_raw, re.IGNORECASE)
        ans_keys = sorted(list(set([k.lower() for k in raw_keys])))
        
        # Detect if code snippet is in question text
        code_snippet = None
        # Check for code patterns
        if "public class Car" in body:
            code_snippet = "public class Car{\n  private Wheel wheels[4];\n  public Car (){\n    wheels[0] = new Wheel();\n    wheels[1] = new Wheel();\n    wheels[2] = new Wheel();\n    wheels[3] = new Wheel();\n  }\n}"
            q_text = "Based on the following Java code, which of the following statements are correct?"
        elif "if (x>=5 || y<20) z++;" in body:
            code_snippet = "if (x >= 5 || y < 20) z++;"
            q_text = "For the following program statement, which of the following test suites would achieve basic condition coverage?"
        elif "int main() {" in body:
            code_snippet = "int main() {\n  int x, y = 0;\n  scanf(\"%d\", &x);\n  if (x > 50)\n    y = y + 5;\n  else\n    y = y + 10;\n  if (x % 2 == 0)\n    y = y + 20;\n  else\n    y = y + 30;\n}"
            q_text = "At least how many test cases are needed for achieving decision coverage on the given C code?"
        elif "int check(int a, int b, int c)" in body:
            code_snippet = "int check(int a, int b, int c) {\n  int result;\n  if (a < b)\n    if (a < c)\n      result = a;\n    else\n      result = c;\n  else\n    if (b < c)\n      result = b;\n    else\n      result = c;\n  return result;\n}"
            q_text = "What would be the Cyclomatic complexity measure of the following program?"
        elif "if ((p > 10) && (q < 50))" in body:
            code_snippet = "if ((p > 10) && (q < 50))\n    y = y + 1;"
            q_text = "At least how many test cases are required to achieve MC/DC coverage of the following code segment:"
        elif "if ((x > 0) || (y < 10))" in body:
            code_snippet = "if ((x > 0) || (y < 10))"
            q_text = "At least how many test cases are required to achieve multiple condition coverage for the following decision?"
            
        # Diagram image check
        image_path = diagram_mapping.get((ass_num, q_num), None)
        
        q_obj = {
            "id": f"q_{ass_num}_{q_num}",
            "globalIndex": global_id,
            "assignment": ass_num,
            "assignmentName": f"Assignment {ass_num}",
            "questionNumber": q_num,
            "topic": assignment_topics.get(ass_num, "Software Engineering"),
            "type": "MSQ" if len(ans_keys) > 1 else "MCQ",
            "marks": 2,
            "question": q_text,
            "codeSnippet": code_snippet,
            "image": image_path,
            "options": opts,
            "correctAnswers": ans_keys,
            "solution": detailed_sol
        }
        all_questions.append(q_obj)
        global_id += 1

print(f"Total processed questions: {len(all_questions)}")
with open('all_questions.json', 'w') as f:
    json.dump(all_questions, f, indent=2)

print("Saved all_questions.json successfully!")
