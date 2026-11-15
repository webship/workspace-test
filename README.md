# @webship.co/workspace-test

The **Test** workspace of the [Webship Workspace](https://github.com/webship/workspace) dashboard:
the `test/` folder (type `sites`), its settings file (`core/config/workspace.test.settings.yml`),
its commands and its docs, as a plugin.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-test
bash core/scripts/plugins.sh --activate test --with-needs     # puts `test` on the workspaces list of settings.yml
bash core/scripts/plugins.sh --install test      # the folder, its settings file (once), its commands, its docs (once)
```

The settings file and the docs are placed once and never overwritten: they hold what you put there.
`--deactivate` takes the workspace off the list; the folder and its content stay.

## What it goes with

The AI items land in the four AI folders, so the manifest needs them (`needs`): `ai-agents`, `ai-skills`, `ai-commands`, `ai-prompts`. `--activate test` and `--install test` stop while one is missing and name it; with `--with-needs` they are required, activated and installed first. One of its commands, `cmd-tools-update-all.sh`, still runs `composer` on the machine instead of in a project's container, so the manifest names it as a command a part of the plugin uses (`suggests.commands`): `bash core/scripts/plugins.sh --check test` says whether it is there (https://getcomposer.org/download/), and nothing is installed for you. Everything else here runs through the container tool the workspace already needs.

## The AI items

The plugin carries its own AI items (`ai/` in the package, the manifest's `ai` block), written for the work this folder is for. `--install` places each one in the workspace folder of its kind, when that folder is an active workspace folder; `--uninstall` removes them, and keeps one that was edited in its folder.

| Item | Kind | Lands in | What it is for |
| --- | --- | --- | --- |
| `test-site-tester` | Agent | `ai-agents/test-site-tester.md` | Builds a site in `test/` and runs Webship-js on it: the automated-testing builders, the testing stack on any site, the run, the report and what failed |
| `test-workflow` | Skill | `ai-skills/test-workflow/` | How work is done in `test/`: the order from build to report, every builder and tool with its flags, the settings keys |
| `/test-run` | Command | `ai-commands/test-run.md` | `/test-run <site> [feature or @tag]`: sets the stack up when missing, matches every step, runs and reports what failed and why |
| `test-build-and-run` | Prompt | `ai-prompts/test-build-and-run.md` | A new session that builds a site with the automated-testing stack, runs its suite once and reports the result |

From its folder an item is installed into the AI CLI (Claude Code by default) like any other: the folder's page on the dashboard, or `bash cmd-tools-ai-items.sh <name> --install` in the AI folder (`--to dev/<project>` for one project). A prompt is not installed: the New screen form lists it as the start of a new session. The body of every item is plain Markdown any AI CLI can follow; Claude Code is the default shape (the frontmatter, the launch line of a prompt). Every command, flag, settings key and path an item names is checked by `tests/items.test.ts`; the shape of the items is the one of the reference, [`docs/plugin-items-pattern.md` of the WordPress plugin](https://github.com/webship/workspace-wordpress/blob/1.0.x/docs/plugin-items-pattern.md).

## The commands

| Command |
| --- |
| `cmd-automated-testing-webship11-0-x-project.sh` |
| `cmd-automated-testing-webships3-0-x-project.sh` |
| `cmd-claudecodeui-project.sh` |
| `cmd-cucumber11-0-x-project.sh` |
| `cmd-drupal10-3-x-recommended-project.sh` |
| `cmd-drupal10-recommended-project.sh` |
| `cmd-drupal11-0-x-recommended-project.sh` |
| `cmd-drupal11-4-0-recommended-project.sh` |
| `cmd-drupal11-4-x-recommended-project.sh` |
| `cmd-drupal11-recommended-project.sh` |
| `cmd-drupal12-recommended-project.sh` |
| `cmd-drupal9-recommended-project.sh` |
| `cmd-drupalcms2-0-project.sh` |
| `cmd-drupalcms2-1-0-project.sh` |
| `cmd-drupalcms2-x-project.sh` |
| `cmd-odoo20-project.sh` |
| `cmd-tools-add-users.sh` |
| `cmd-tools-backup-test.sh` |
| `cmd-tools-cancel-users.sh` |
| `cmd-tools-checks.sh` |
| `cmd-tools-clone.sh` |
| `cmd-tools-hostnames.sh` |
| `cmd-tools-reclaim.sh` |
| `cmd-tools-remove.sh` |
| `cmd-tools-screen.sh` |
| `cmd-tools-testing.sh` |
| `cmd-tools-update-all.sh` |
| `cmd-webship11-0-0-project.sh` |
| `cmd-webship11-0-x-project.sh` |
| `cmd-webships2-0-0-project.sh` |
| `cmd-webships2-0-x-project.sh` |
| `cmd-webships3-0-x-project.sh` |
| `cmd-wordpress-project.sh` |
| `cmd-wpbedrock1-project.sh` |

The bash functions these commands call live in the dashboard's `core/scripts/functions`.
