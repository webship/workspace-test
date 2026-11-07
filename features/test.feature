Feature: The Test workspace plugin
  Once the plugin is activated and installed, the test workspace is on the dashboard, and the
  Plugins page lists the plugin with its four steps.

  Scenario: The workspace page is there
    Given I am on "/test"
     Then I should see "Test"

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Test"
      And I should see "@webship/workspace-test"
