# Test

Testing builds, including the automated-testing stacks. A project here exists to be run
against, not to be kept.

Part of the **Webship Workspace** (`~/workspace`), a container-based harness (DDEV by default). The rules in the root
`CLAUDE.md` apply here too; what follows is what is specific to this folder.

## The rule that matters here

Everything goes through DDEV. Never a host `composer`, `drush` or `mysql`:

```bash
ddev composer require drupal/something
ddev drush cr
ddev export-db --file=…        # not mysqldump
ddev delete -y -O              # not a dropped database
```

`ddev start` takes `-y`; **`ddev stop` does not**. Never write a `$databases` block into
`settings.php` — DDEV's `settings.ddev.php` owns the connection.

## Commands here

```bash
bash cmd-automated-testing-webship11-0-x-project.sh   # Webship 11.0.x + Automated Testing (webship-js)
bash cmd-cucumber11-0-x-project.sh                     # Cucumber 11.0.x
bash cmd-drupal10-3-x-recommended-project.sh          # Drupal 10.3.x (recommended project)
bash cmd-drupal10-recommended-project.sh              # Drupal 10 (recommended project)
bash cmd-drupal11-0-x-recommended-project.sh          # Drupal 11.0.x (recommended project)
bash cmd-drupal11-4-0-recommended-project.sh          # Drupal 11.4.0 (recommended project)
bash cmd-drupal11-4-x-recommended-project.sh          # Drupal 11.4.x (recommended project)
bash cmd-drupal11-recommended-project.sh              # Drupal 11 (recommended project)
bash cmd-drupal9-recommended-project.sh               # Drupal 9 (recommended project)
bash cmd-drupalcms2-1-0-project.sh                    # Drupal CMS 2.1.0
bash cmd-drupalcms2-x-project.sh                      # Drupal CMS 2.x
bash cmd-tools-add-users.sh                           # Bootstrap.
bash cmd-tools-backup-test.sh                         # Bootstrap.
bash cmd-tools-cancel-users.sh                        # Bootstrap.
bash cmd-tools-git-change-filemode-to-false.sh        # Bootstrap.
bash cmd-tools-graphify.sh                            # Map a project in this workspace into a queryable knowledge graph with
bash cmd-tools-obsidian.sh                             # Turn a project graph into an Obsidian vault
bash cmd-tools-ragify.sh                              # Index a project in this workspace into the Milvus vector database
bash cmd-tools-remove.sh                              # Bootstrap.
bash cmd-tools-testing.sh                             # Set up the automated-testing environment on an existing project in this workspace, or run its
bash cmd-tools-update-all.sh                          # Bootstrap.
bash cmd-webship11-0-0-project.sh                     # Webship 11.0.0
bash cmd-webship11-0-x-project.sh                     # Webship 11.0.x
bash cmd-webships2-0-0-project.sh                     # Webships 2.0.0
bash cmd-webships2-0-x-project.sh                     # Webships 2.0.x
```

Every one locates the workspace from its own path, so there is nothing to export and nothing to
install. `--help` on any of them lists its arguments.

## AI items for this folder

The plugin of this folder (`@webship.co/workspace-test`) places its own AI items in the AI folders of the
workspace, when they are active:

- `test-site-tester` (`ai-agents/`): Builds a site in `test/` and runs Webship-js on it: the automated-testing builders, the testing stack on any site, the run, the report and what failed
- `test-workflow` (`ai-skills/`): How work is done in `test/`: the order from build to report, every builder and tool with its flags, the settings keys
- `/test-run` (`ai-commands/`): `/test-run <site> [feature or @tag]`: sets the stack up when missing, matches every step, runs and reports what failed and why
- `test-build-and-run` (`ai-prompts/`): A new session that builds a site with the automated-testing stack, runs its suite once and reports the result
