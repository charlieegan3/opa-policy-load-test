# opa-policy-load-test

A project to test loading thousands of policies into OPA to mesure performance

## Instructions

Execute the `pg.mjs` Noje.js script informing the number of rules as an argument. The policy will be created inside the `./policy` directory.

```sh
cd policy-generator
node pg.mjs 50000
```

Then load the policies into OPA

```sh
opa run -s -b ./policy
```

Use the `input.json` as an example of input data when asking OPA for authorization.

Example:

```json
{
    "input": {
        "subject": {
            "role": "role_10000"
        },
        "resource": {
            "type": "resource_1000"
        },
        "action": "action_1000"
    }
}
```

And the expected result is the rule's name that authorize the action.

Example:

```json
{
    "result": {
        "allow": {
            "title": "Rule 1000"
        }
    }
}
```

Below we have an example of a generated rule:

```rego
# METADATA
# title: Rule 0
# description: Rule 0...
allow := result if {
    input.subject.role == "role_0"
    input.action == "action_0"
    input.resource.type == "resource_0"
    annotation := rego.metadata.rule()
    result := {"title": annotation.title}
}
```
