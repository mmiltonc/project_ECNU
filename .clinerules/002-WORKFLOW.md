# 002 - Workflow

## Tasks

- Track work in `documents/tasks.md`.
- Every task must have a stable ID like `T-000`.
- If a task needs detail, create a plan file in `documents/plans/` named `T-000-plan.md`.
- Link the task to its plan from `documents/tasks.md`.
- When a task is completed, update its checkbox in `documents/tasks.md`.

## Plans

Before implementing a documented plan:

- Re-read the relevant code and tests.
- Re-analyze the plan in more depth.
- Confirm whether the plan is still correct.
- Update the plan first if new information changes the intended implementation.

Plans should be specific enough that another engineer or agent can implement them without making decisions.

## Implementation Flow

For every task:

1. Review the task and any plan.
2. Re-analyze the relevant code and update the plan if needed.
3. Create a short checklist for the task before making changes.
4. Keep the checklist updated as each step is completed.
5. Run the relevant tests first to establish the pre-change state.
6. Implement the task.
7. Run the relevant tests again.
8. Run the broader test suite when the change affects shared behavior.
9. Update `documents/tasks.md` if the task is complete.

## Task Checklists

- Create a checklist whenever working on a task.
- Keep checklist items concrete and verifiable.
- Update items incrementally, not only at the end.
- Include analysis, pre-change tests, implementation, post-change tests, and task documentation updates when relevant.

## Characterization Before Behavior Changes

When current behavior appears wrong but the task is to add tests:

- First characterize the current behavior with tests.
- Add a separate task for changing the behavior.
- Do not change production code unless the task explicitly calls for it.

## Documentation

- Keep docs short and actionable.
- Use `documents/testing.md` for testing conventions.
- Keep task-specific implementation details in `documents/plans/`.
