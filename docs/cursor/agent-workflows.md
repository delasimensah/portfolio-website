# Common Agent Workflows

Proven patterns for using Cursor’s Agent effectively. Each workflow uses the Agent’s ability to search, edit, and run commands on its own.

**Use this doc when:** You want TDD with the Agent, git/PR commands, onboarding to a codebase, architecture diagrams, long-running loops (hooks), design-to-code, or when to use Cloud Agents.

**For Agent basics:** [Agent](./agent.md), [Commands](./commands.md), [Hooks](./hooks.md), [Browser](./browser.md), [Cloud Agents](./cloud-agents.md).

---

## Test-driven development

Agents work best with a **clear, verifiable target**. Tests give the Agent a goal to iterate against.

### TDD workflow

1. **Ask the Agent to write tests** from expected input/output. Say you’re doing TDD so it doesn’t implement the feature yet.
2. **Ask it to run the tests and confirm they fail.** Tell it not to write implementation at this step.
3. **Commit the tests** when they look good.
4. **Ask the Agent to implement code that passes the tests**, and not to change the tests. Have it iterate until all tests pass.
5. **Commit the implementation** when satisfied.

The Agent can run tests, see failures, and iterate; the test suite is the acceptance criteria.

### Example prompts

```
Write tests for a function that validates email addresses.
Expected behavior:
- "user@example.com" returns true
- "invalid-email" returns false
- Empty string returns false

Use the testing patterns in `__tests__/`. Don't implement the function yet—I want the tests to fail first.
```

```
Now implement the validateEmail function to pass all tests.
Don't modify the tests. Keep iterating until all tests pass.
```

---

## Git workflows with commands

Use **custom commands** (`.cursor/commands/`) to automate multi-step git workflows. Trigger with **`/`** in the Agent input.

### Pull request command

Create **`.cursor/commands/pr/COMMAND.md`**:

```
Create a pull request for the current changes.

1. Look at staged and unstaged changes with `git diff`
2. Write a clear commit message from what changed
3. Commit and push to the current branch
4. Use `gh pr create` for title/description
5. Return the PR URL when done
```

Then **`/pr`** in Agent to commit, push, and open a PR.

### Fix issue command

Create **`.cursor/commands/fix-issue/COMMAND.md`**:

```
Fix the GitHub issue specified by the user.

1. Fetch issue with `gh issue view <number>`
2. Search the codebase for relevant code
3. Implement a fix following existing patterns
4. Write tests if appropriate
5. Open a PR referencing the issue
```

Usage: **`/fix-issue 123`**

### Other useful commands

- **`/review`** — Run linters, check for common issues, summarize what needs attention
- **`/update-deps`** — Check outdated deps, update one by one, run tests after each
- **`/docs`** — Generate or update docs for recent changes

Commit commands to git so the team can reuse them. When the Agent gets a workflow wrong, update the command.

---

## Codebase understanding

Use the Agent like a teammate when **onboarding** to a new codebase. Ask the same kinds of questions you’d ask a colleague.

### Example questions

- “How does logging work in this project?”
- “How do I add a new API endpoint?”
- “What edge cases does `CustomerOnboardingFlow` handle?”
- “Why are we calling `setUser()` instead of `createUser()` on line 1738?”
- “Walk me through what happens when a user submits the login form.”

The Agent uses grep and [semantic search](./semantic-search.md) to explore and answer.

### Building understanding incrementally

Start broad, then narrow:

1. “Give me a high-level overview of this codebase”
2. “How does the authentication system work?”
3. “Show me the token refresh flow specifically”
4. “Why does this function check for null here?”

Each question builds on the last; the Agent keeps context across the conversation.

---

## Architecture diagrams

For big changes or docs, ask the Agent to **generate architecture diagrams** in Mermaid. Start with one flow or component; use types like `flowchart`, `sequenceDiagram`, or `classDiagram`. Install a Mermaid extension to preview in Markdown. Start low-level and ask the Agent to summarize or combine into higher-level views. Syntax: [Mermaid docs](https://mermaid.js.org/).

### Example prompt

```
Create a Mermaid diagram showing the data flow for our authentication system,
including OAuth providers, session management, and token refresh.
```

The Agent analyzes the codebase and produces a diagram you can drop into docs. Useful for PR descriptions, onboarding docs, and spotting architectural issues early.

---

## Long-running agent loops

Using [Hooks](./hooks.md), you can have the Agent **run for many iterations** until a goal is met.

### Example: run until tests pass

In **`.cursor/hooks.json`**:

```json
{
  "version": 1,
  "hooks": {
    "stop": [{ "command": "bun run .cursor/hooks/grind.ts" }]
  }
}
```

The hook script receives context and can return a **`followup_message`** to continue the loop (e.g. “Continue working; update .cursor/scratchpad.md with DONE when complete”). Cap iterations (e.g. `MAX_ITERATIONS`) and exit when done or when status is not `completed`.

Useful for: run-and-fix until tests pass, iterate on UI until it matches a mockup, or any verifiable goal.

For hook input/output schema and events, see [Hooks](./hooks.md) and [Cursor docs – Hooks](https://docs.cursor.com/agent/hooks).

---

## Design to code

The Agent can use **images** (screenshots, design files, image paths). Use the [Browser](./browser.md) sidebar to preview and iterate.

### Workflow

1. Paste a design mockup into the Agent input.
2. Ask the Agent to implement the component.
3. It matches layout, colors, and spacing from the image.
4. Preview in the browser sidebar and refine.

For richer design data, use the [Figma MCP server](https://docs.cursor.com/context/mcp/directory) (or other design MCPs) with [MCP](./mcp.md).

### Visual debugging

Paste a **screenshot** of a bug or wrong UI into the Agent; often faster than describing it. The Agent can also drive the browser to take screenshots, run the app, and check visual changes. See [Browser](./browser.md).

---

## Delegating to Cloud Agents

[Cloud Agents](./cloud-agents.md) are good for work you’d otherwise put on a todo list:

- Bug fixes that came up while you were doing something else
- Refactors of recent code
- Generating tests for existing code
- Documentation updates

Start them from [cursor.com/agents](https://cursor.com/agents), the Cursor editor, or your phone. They run in remote sandboxes so you can close your laptop and check results later.

You can also trigger agents from Slack with **@Cursor**. See [Slack](./slack.md).

---

## See also

- [Agent](./agent.md) — How the Agent works and what it can do
- [Commands](./commands.md) — Custom slash commands in `.cursor/commands/`
- [Hooks](./hooks.md) — Stop/continue hooks for long-running loops
- [Browser](./browser.md) — Preview and visual debugging
- [Cloud Agents](./cloud-agents.md) — Remote agents, web/mobile, Slack
- [Slack](./slack.md) — @Cursor in Slack
