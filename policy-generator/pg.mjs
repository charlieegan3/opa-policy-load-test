import { open, rm } from "node:fs/promises";

let fileHandle;
let ruleQuantity = process.argv[2];

try {
  await rm("../policy/data.json", { force: true });
  fileHandle = await open("../policy/data.json", "a");

  await fileHandle.appendFile("{\"rules\":[");

  for (let i = 0; i < ruleQuantity; i++) {
    let ruleTemplate = `
{
  "title": "Rule ${i}",
  "action": "action_${i}",
  "subject_role": "role_${i}",
  "resource_type": "resource_${i}"
},
`;
    await fileHandle.appendFile(ruleTemplate);
  }

  await fileHandle.appendFile(`
{
  "title": "Rule last",
  "action": "action_last",
  "subject_role": "role_last",
  "resource_type": "resource_last"
}
`);
  await fileHandle.appendFile("]}");
} catch (err) {
  console.log(err);
  await fileHandle?.close();
} finally {
  await fileHandle?.close();
}
