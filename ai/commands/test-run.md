---
description: Run the Webship-js suite of a site in the test/ folder of the Webship Workspace — set the testing stack up when it is missing, match every step, run the suite, one feature or one tag in the site's container, and report what failed and why.
argument-hint: '<site> [tests/features/<name>.feature | @tag]'
---

# /test-run

Run Webship-js on the site of `~/workspace/test` named in: `$ARGUMENTS`

The arguments are the text typed after the command. The first word is the site (its folder name
in `test/`). What follows, if anything, narrows the run: a path that starts with `tests/features/`
is one feature or one folder of features, a word that starts with `@` is a tag expression. With
nothing after the site, the whole suite runs. With no site at all, stop and ask for one:
`ls -d ~/workspace/test/*/.ddev` lists the candidates.

The workspace is container-based (DDEV by default) and everything below runs in the site's
container through the folder's own command. Never run the test runner or `npm` on the host.

## 1. Make sure the testing stack is there

```bash
cd ~/workspace/test
ls <site>/cucumber.js
```

If `cucumber.js` is missing, set the stack up (it adds what is missing and keeps what was changed):

```bash
bash cmd-tools-testing.sh <site>
```

## 2. Match every step, without a browser

```bash
bash cmd-tools-testing.sh <site> --dry-run
bash cmd-tools-testing.sh <site> --dry-run --path tests/features/<name>.feature
bash cmd-tools-testing.sh <site> --dry-run --tags "@critical"
```

Use the form that matches what was asked. An `Undefined` or `Ambiguous` step is a finding: name
the feature, the line and the phrase, and stop before the real run.

## 3. Run

```bash
bash cmd-tools-testing.sh <site> --run
bash cmd-tools-testing.sh <site> --run --path tests/features/<name>.feature
bash cmd-tools-testing.sh <site> --run --tags "@critical"
```

Run it once. Do not add `--retry` and do not change a feature to make the run pass.

## 4. Report

1. The site, its address (`https://<site>.ddev.site`) and what was run (suite, feature or tag).
2. The totals the run printed: scenarios and steps, passed and failed, and the time.
3. For each failed scenario: the feature and line, the step that failed, the message, and what it
   means: a defect of the site, a scenario that asserts something the site never did, or the
   environment.
4. Where the report is: `~/workspace/test/<site>/tests/reports/cucumber_report.html`.

A failing suite is a result: report it as it is. For building a site first, hand over to the
`test-site-tester` agent; the `test-workflow` skill lists every command of the folder.

Before you write or change a scenario, or read a failed run, read the book *Automated Functional
Testing Recipes* (its `README.md`, then the matching chapter):
`.claude/automated-functional-testing-recipes/` in the project,
`~/.claude/automated-functional-testing-recipes/`, or
https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
