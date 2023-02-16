#!/usr/bin/env zx

const BASE_BRANCH = "main";
const REVIEWER = "dany0502";
const ASSIGNEE = "@me";
let bodyMessage = "SSIA \n\n https://example.com/";
let title = "Title";
const branch = await $`git branch --show-current`;
const tickets = branch.toString().match(/exs-[0-9]{3,4}/gi);
if (tickets.length) {
  title = `[${tickets[0].toUpperCase()}] ${argv.m || ""}`;
  bodyMessage += tickets[0].toLowerCase();
}
const pr =
  await $`gh pr create --title ${title} --body ${bodyMessage} --assignee ${ASSIGNEE} --base ${BASE_BRANCH}`;
await $`open ${pr}`;
