#!/usr/bin/env node
/**
 * Tell Bing (and the other IndexNow engines) every URL in the sitemap has
 * changed. ChatGPT search and Copilot answer from Bing's index, so this is the
 * fastest route from a deploy to being retrievable there.
 *
 * Run after a production deploy is live:  npm run indexnow
 * The key file public/ac5b0c6807e43b9ea6d4d185462eb686.txt proves the site owns the key.
 */
const KEY = "ac5b0c6807e43b9ea6d4d185462eb686";
const HOST = "shivamgoel.me";

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("no URLs found in the live sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`indexnow: ${res.status} for ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
