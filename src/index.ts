/**
 * The Test workspace for Webship Workspace: the `test/` folder as a plugin.
 *
 * What the package carries is placed by the installer from the manifest (the folder's settings file,
 * its commands, its docs and its AI items, each in the folder of its kind) and listed by --activate; the dashboard draws the workspace from the
 * settings file like any other. Nothing to register at run time yet: this is where the folder's own
 * rail buttons, row menus or assistant context would go.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';

export const WORKSPACE_KEY = 'test';

/** The AI items the installer places, each in the workspace folder of its kind (ai/ in this package). */
export const AGENTS = ['test-site-tester'];
export const SKILLS = ['test-workflow'];
export const AI_COMMANDS = ['test-run'];
export const PROMPTS = ['test-build-and-run'];

export function register(api: PluginApi): void {
  api.addAssistantContext(() => `The test/ workspace is the Test workspace (a plugin, @webship.co/workspace-test); its commands are the cmd-*.sh scripts in that folder. It comes with AI items for work in this folder: the agent \`test-site-tester\` (ai-agents/), the skill \`test-workflow\` (ai-skills/), the command \`/test-run\` (ai-commands/) and the prompt \`test-build-and-run\` (ai-prompts/).`);
}
