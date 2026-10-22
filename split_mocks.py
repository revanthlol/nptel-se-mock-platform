import json

with open('all_questions.json', 'r') as f:
    questions = json.load(f)

# Group by assignment
by_ass = {}
for q in questions:
    by_ass.setdefault(q['assignment'], []).append(q)

mock1 = []
mock2 = []

# Assignment 0 to 12: 13 assignments.
# For each assignment, choose 4 questions for mock1 and 4 questions for mock2 (with slight adjustments to total exactly 50 each).
# 13 * 4 = 52. So 11 assignments give 4 questions, and 2 assignments give 3 questions -> total 50.

# For Mock 1:
# Let's pick questions for mock1 from each assignment:
# Ass 0: Q1, Q3, Q5, Q7 (4)
# Ass 1: Q1, Q3, Q5, Q7 (4)
# Ass 2: Q1, Q3, Q5, Q7 (4)
# Ass 3: Q1, Q3, Q5, Q7 (4)
# Ass 4: Q1, Q3, Q5, Q7 (4)
# Ass 5: Q1, Q3, Q5, Q7 (4)
# Ass 6: Q1, Q3, Q5, Q7 (4)
# Ass 7: Q1, Q3, Q4(diag), Q7 (4)
# Ass 8: Q1(diag), Q3(diag), Q4(code), Q7 (4)
# Ass 9: Q1, Q3, Q5, Q6(diag) (4)
# Ass 10: Q1, Q3, Q5, Q7 (4)
# Ass 11: Q3, Q5, Q7 (3)
# Ass 12: Q1, Q5, Q8(code) (3)
# Total Mock 1 = 4*11 + 3*2 = 44 + 6 = 50!

# For Mock 2 (disjoint complementary set!):
# Ass 0: Q2, Q4, Q6, Q8 (4)
# Ass 1: Q2, Q4, Q6, Q8 (4)
# Ass 2: Q2, Q4, Q6, Q8 (4)
# Ass 3: Q2, Q4, Q6, Q8 (4)
# Ass 4: Q2, Q4, Q6, Q8 (4)
# Ass 5: Q2, Q4, Q6, Q8 (4)
# Ass 6: Q2, Q4, Q6, Q8 (4)
# Ass 7: Q2, Q5(diag), Q6, Q8 (4)
# Ass 8: Q2(diag), Q5(diag), Q6, Q8 (4)
# Ass 9: Q2, Q4, Q7, Q8 (4)
# Ass 10: Q2, Q4, Q6, Q8 (4)
# Ass 11: Q1(code), Q2, Q9(code) (3)
# Ass 12: Q2, Q4, Q10(code) (3)
# Total Mock 2 = 50!

m1_selection = {
    0: [1, 3, 5, 7],
    1: [1, 3, 5, 7],
    2: [1, 3, 5, 7],
    3: [1, 3, 5, 7],
    4: [1, 3, 5, 7],
    5: [1, 3, 5, 7],
    6: [1, 3, 5, 7],
    7: [1, 3, 4, 7],
    8: [1, 3, 4, 7],
    9: [1, 3, 5, 6],
    10: [1, 3, 5, 7],
    11: [3, 5, 7, 10], # 4
    12: [1, 5]         # 2 -> total 44 + 4 + 2 = 50
}

m2_selection = {
    0: [2, 4, 6, 8],
    1: [2, 4, 6, 8],
    2: [2, 4, 6, 8],
    3: [2, 4, 6, 8],
    4: [2, 4, 6, 8],
    5: [2, 4, 6, 8],
    6: [2, 4, 6, 8],
    7: [2, 5, 6, 8],
    8: [2, 5, 6, 8],
    9: [2, 4, 7, 8],
    10: [2, 4, 6, 8],
    11: [1, 2, 9],    # 3
    12: [2, 4, 10]    # 3 -> total 44 + 3 + 3 = 50
}

for ass_id, q_nums in m1_selection.items():
    for qn in q_nums:
        # find matching question
        match = [q for q in by_ass[ass_id] if q['questionNumber'] == qn][0]
        q_copy = dict(match)
        mock1.append(q_copy)

for ass_id, q_nums in m2_selection.items():
    for qn in q_nums:
        match = [q for q in by_ass[ass_id] if q['questionNumber'] == qn][0]
        q_copy = dict(match)
        mock2.append(q_copy)

# Re-index questions within mock
for idx, q in enumerate(mock1):
    q['mockQuestionNumber'] = idx + 1

for idx, q in enumerate(mock2):
    q['mockQuestionNumber'] = idx + 1

print(f"Mock 1 questions: {len(mock1)}")
print(f"Mock 2 questions: {len(mock2)}")

# Check overlap
m1_ids = set(q['id'] for q in mock1)
m2_ids = set(q['id'] for q in mock2)
overlap = m1_ids.intersection(m2_ids)
print(f"Overlap between Mock 1 and Mock 2: {len(overlap)}")

with open('mock1.json', 'w') as f:
    json.dump(mock1, f, indent=2)

with open('mock2.json', 'w') as f:
    json.dump(mock2, f, indent=2)

print("Saved mock1.json and mock2.json!")
