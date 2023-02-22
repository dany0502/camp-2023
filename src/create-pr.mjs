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

let bodyMessage = "SSIA \n\n";
let title = "";
const tickets = branch.toString().match(/exs-[0-9]{3,4}/gi);
const ticketId = tickets.length ? tickets[0] : null;
if (ticketId !== null) {
  title = `[${ticketId.toUpperCase()}] ${input}`;
  bodyMessage += `https://example.com/${ticketId.toLowerCase()}`;
} else {
  title = `[NO-ISSUE] ${title}`;
}

const pr =
  await $`gh pr create --title ${title} --body ${bodyMessage} --assignee ${ASSIGNEE} --base ${BASE_BRANCH}`;
await $`open ${pr}`;
