package test

import rego.v1

rules[rule.subject_role][rule.action][rule.resource_type] := rule.title if {
	some rule in data.rules
}

allow := rules[input.subject.role][input.action][input.resource.type]
