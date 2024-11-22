import { open, rm } from "node:fs/promises";

let fileHandle;
let ruleQuantity = process.argv[2];

try {
    await rm("../policy/policy.rego", { force: true });
    fileHandle = await open("../policy/policy.rego", "a");

    await fileHandle.appendFile("package test\n\n");
    await fileHandle.appendFile("import rego.v1\n");

    for (let i = 0; i < ruleQuantity; i++) {
        let ruleTemplate = `\n# METADATA
# title: Rule ${i}
# description: Rule ${i}...
allow := result if {
    input.subject.role == "role_${i}"
    input.action == "action_${i}"
    input.resource.type == "resource_${i}"
    annotation := rego.metadata.rule()
    result := {"title": annotation.title}
}\n`;

        await fileHandle.appendFile(ruleTemplate);
    }
} catch (err) {
    console.log(err);
    await fileHandle?.close();
} finally {
    await fileHandle?.close();
}
