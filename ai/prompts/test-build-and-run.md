Build a site with the automated-testing stack in the test folder, run its Webship-js suite and report the result.

The launch line is for Claude Code, the default; the text between the triple quotes can be given to another AI CLI as it is.

```
claude --permission-mode bypassPermissions """
Build a site named <name> in the test folder with the automated-testing stack and run its suite
# ~/workspace/test · https://<name>.ddev.site · container-based (DDEV by default)
# the builder deletes a project of the same name first: stop if <name> is a site somebody still needs
# nothing on the host: no composer, drush, npm or mysql outside the site's container

1. bash cmd-automated-testing-webship11-0-x-project.sh --help
   tell me the flags it takes
2. bash cmd-automated-testing-webship11-0-x-project.sh <name>
   Webship 11, installed, with Webship-js set up in the site's container
3. bash cmd-tools-testing.sh <name> --dry-run
   every step must match a definition: stop and show me any that does not
4. bash cmd-tools-testing.sh <name> --run
   once, with no retry

Report the totals (scenarios and steps, passed and failed), and for each failed scenario the
feature, the step, the message and what it means for the site. A failing suite is a result.
The report is at <name>/tests/reports/cucumber_report.html.
Then ask me whether to keep the site or remove it with: bash cmd-tools-remove.sh <name>
"""
```
