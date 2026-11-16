---
name: test-workflow
description: How work is done in the `test/` folder of the Webship Workspace — which `cmd-*.sh` builds a site with the automated-testing stack, how the Webship-js suite of a site is set up, matched and run, the flags of each command, where the reports land, and the settings keys of the folder. Use when asked to "build a test site", "run the suite on this test build", "which builder sets up automated testing", "what does this test command take", or when a command of `test/` is about to be run.
argument-hint: '[what you are about to do in test]'
---

# test-workflow

`~/workspace/test` is the Test folder of a Webship Workspace (container-based, DDEV by default):
testing builds, including the automated-testing stacks. A site here exists to be run against with
Webship-js, not to be kept. It comes with the Test plugin (`@webship.co/workspace-test`), which places the commands
below in the folder. Every command finds the workspace from its own path; run it from the folder,
and read `bash <command> --help` before quoting a flag.

## The order of work

1. **Build** a site. With the testing stack in one go:
   `bash cmd-automated-testing-webship11-0-x-project.sh mysite`; or any builder, then step 2. The
   name is the folder, the container project and the address (`https://mysite.ddev.site`). A
   builder deletes a project of the same name first.
2. **Set the testing stack up** on a site that has none: `bash cmd-tools-testing.sh mysite`. It
   adds Webship-js and the first feature (`mysite/tests/features/check-homepage.feature`), and keeps
   what was changed when it is run again.
3. **Match** every step without a browser: `bash cmd-tools-testing.sh mysite --dry-run`.
4. **Run**: `bash cmd-tools-testing.sh mysite --run`, or one feature with `--path`, or one tag with
   `--tags`. The report is `mysite/tests/reports/cucumber_report.html`.
5. **Clear**: `bash cmd-tools-remove.sh mysite`, after asking. Keep the reports that were asked for.

## Builders

| Builder | Builds | Flags |
| --- | --- | --- |
| `cmd-automated-testing-webship11-0-x-project.sh` | Webship 11.0.x + Automated Testing (webship-js) | `--headless` `--no-headless` `--php-version` `--run` `--run-headless` `--run-no-headless` |
| `cmd-automated-testing-webships3-0-x-project.sh` | Webships 3.0.x + Automated Testing (webship-js) | `--add-users` `--php-version` `--run` `--run-headless` `--template` |
| `cmd-claudecodeui-project.sh` | Claude Code UI | `--force` `--install` |
| `cmd-cucumber11-0-x-project.sh` | Cucumber 11.0.x | `--add-users` `--enable` `--install` `--php-version` `--require` `--skip-drop-database` `--skip-set-default-settings` |
| `cmd-drupal10-3-x-recommended-project.sh` | Drupal 10.3.x (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal10-recommended-project.sh` | Drupal 10 (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal11-0-x-recommended-project.sh` | Drupal 11.0.x (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal11-4-0-recommended-project.sh` | Drupal 11.4.0 (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal11-4-x-recommended-project.sh` | Drupal 11.4.x (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal11-recommended-project.sh` | Drupal 11 (latest) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal12-recommended-project.sh` | Drupal 12 (latest) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupal9-recommended-project.sh` | Drupal 9 (recommended project) | `--add-users` `--dev` `--enable` `--install` `--launch` `--php-version` `--profile` `--require` |
| `cmd-drupalcms2-0-project.sh` | Drupal CMS 2.0 | `--add-users` `--install` `--php-version` |
| `cmd-drupalcms2-1-0-project.sh` | Drupal CMS 2.1.0 | `--add-users` `--install` `--php-version` |
| `cmd-drupalcms2-x-project.sh` | Drupal CMS 2.x | `--add-users` `--install` `--php-version` |
| `cmd-odoo20-project.sh` | Odoo 20 Community | `--demo` `--install` `--launch` |
| `cmd-webship11-0-0-project.sh` | Webship 11.0.0 | `--add-users` `--enable` `--install` `--php-version` `--require` `--skip-drop-database` `--skip-set-default-settings` |
| `cmd-webship11-0-x-project.sh` | Webship 11.0.x | `--add-users` `--enable` `--install` `--php-version` `--require` `--skip-drop-database` `--skip-set-default-settings` |
| `cmd-webships2-0-0-project.sh` | Webships 2.0.0 | `--add-users` `--enable` `--install` `--php-version` `--require` `--skip-drop-database` `--skip-set-default-settings` |
| `cmd-webships2-0-x-project.sh` | Webships 2.0.x | `--add-users` `--enable` `--install` `--php-version` `--require` `--skip-drop-database` `--skip-set-default-settings` |
| `cmd-webships3-0-x-project.sh` | Webships 3.0.x | `--add-users` `--php-version` `--template` |
| `cmd-wordpress-project.sh` | WordPress (latest) | `--install` `--launch` `--php-version` |
| `cmd-wpbedrock1-project.sh` | WordPress on Composer (Bedrock ^1) | `--install` `--launch` `--php-version` |

`--install` installs the site (without it the installer waits at the address); `--add-users` adds
the default accounts of the distribution. The two automated-testing builders install the site and
set the stack up themselves; `--run-headless` also runs the suite.

## Tools

| Command | What it does | Flags |
| --- | --- | --- |
| `cmd-tools-add-users.sh` | Adds the default accounts of a distribution to a site: `<site> <distribution>` | none |
| `cmd-tools-backup-test.sh` | An item as an archive and its database as a dump, into `backups/test/` | none |
| `cmd-tools-cancel-users.sh` | Removes those accounts again: `<site> <distribution>` | none |
| `cmd-tools-checks.sh` | Runs the code-quality checks an item's `package.json` declares; `--list` prints the plan and runs nothing | `--browser` `--e2e` `--fail-fast` `--install` `--list` `--only` `--runner` `--skip` |
| `cmd-tools-clone.sh` | Folder and database under a new name, here or in another folder | `--branch` `--extra-hostname` `--no-build-copy` `--no-db` `--target-workspace` `--to` `--with-workspace-hostname` `--worktree` |
| `cmd-tools-hostnames.sh` | The addresses a site answers at, and one more | `--add` `--remove` `--start` `--with-workspace` |
| `cmd-tools-reclaim.sh` | Disk held by projects whose folder is gone: a dry run unless `--apply` | `--apply` `--keep-days` `--list-protected` `--only` |
| `cmd-tools-remove.sh` | Containers, volumes and folder together; refuses work that is on no remote unless `--force` | `--backup` `--force` `--orphans` |
| `cmd-tools-screen.sh` | A detached session with a log the dashboard follows | `--follow` `--list` `--log` `--run` `--stop` |
| `cmd-tools-testing.sh` | Sets the Webship-js testing stack up on a site, or runs its suite in the site's container | `--browser` `--configure` `--dry-run` `--headed` `--path` `--retry` `--run` `--tags` |
| `cmd-tools-update-all.sh` | `composer update` in every site, **on the host**: not yet moved into the containers. Do not run it unasked; use `ddev composer update` in one site | none |

## Settings

| Key | File | What it says |
| --- | --- | --- |
| `doc.name` | `core/config/workspace.test.settings.yml` | The folder under the workspace root: `test` |
| `type` | `core/config/workspace.test.settings.yml` | `sites`: the rows of the page are built sites, with the Build, Tests, Checks, Users, Backup and Remove actions |
| `composer` | `core/config/workspace.test.settings.yml` | `full`: the COMPOSER menu may install and update here, in the site's container |
| `assistant.name`, `assistant.placeholder` | `core/config/workspace.test.settings.yml` | What the assistant is called on this page; `default` takes the workspace's |
| `workspaces` | `core/config/settings.yml` | The active folders; `test` is on it once the plugin is activated |
| `account.name`, `account.mail` | `core/config/settings.yml` | The workspace account: the administrator of every site a builder installs |

## Rules

- A failing suite is a result: run it once and report it as it is.
- No account created by a scenario, no password in a feature file.
- Containers only: never `composer`, `drush`, `php`, `npm` or `mysql` on the host for a site.
- A site here is disposable: offer to remove it when the run is reported.

The Test plugin places these beside this one, each in the workspace folder of its kind: the agent `test-site-tester` (`ai-agents/`), the command `/test-run` (`ai-commands/`) and the prompt `test-build-and-run` (`ai-prompts/`).

## The book

For any automated functional testing in this work (a Gherkin feature, a step definition, choosing a
step, a test run and its failures), read the book *Automated Functional Testing Recipes* first.

- **Where.** Use the first that exists: `.claude/automated-functional-testing-recipes/` in the project,
  `~/.claude/automated-functional-testing-recipes/` (installed by webship/webship-js-ai-agent,
  webship/webship-js-skills or webship/ai-agents), or
  https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
- **How.** Its `README.md` first, then the chapter that matches the task (one file per chapter,
  named by its subject), not the single complete file.
- **Which wins.** The installed webship-js package and the step pack are the source of truth for
  step phrasing. When they differ from the book, follow them and say so.
