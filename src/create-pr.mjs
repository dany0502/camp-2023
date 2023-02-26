#!/usr/bin/env zx

// シェルスクリプトの標準出力を無効にする
$.verbose = false;
const BASE_BRANCH = "main";
const ASSIGNEE = "@me";

const branch = await $`git branch --show-current`;
try {
  await $`git branch -r | grep ${branch}`;
} catch {
  console.error("ブランチをリモートにプッシュしてください。");
  await $`exit 1`;
}

const input = await question("PRのタイトルを入力してください。");

const tickets = branch.toString().match(/exs-[0-9]{3,4}/gi);
const ticketId = (tickets || []).length ? tickets[0] : null;

const BODY_MESSAGE =
  ticketId !== null
    ? `SSIA \n\n https://example.com/${ticketId.toLowerCase()}`
    : "SSIA \n\n";
const TITLE =
  ticketId !== null
    ? `[${ticketId.toUpperCase()}] ${input}`
    : `[NO-ISSUE] ${input}`;

const pr =
  await $`gh pr create --title ${TITLE} --body ${BODY_MESSAGE} --assignee ${ASSIGNEE} --base ${BASE_BRANCH}`;
await $`open ${pr}`;
