# jules.lamons.org

Personal website of Julianna (Jules) Lamon, built with [Eleventy](https://www.11ty.dev/) and published by GitHub Pages.

## Everyday edits (no installs needed)

Everything can be edited on github.com: open a file, click the ✏️ pencil, change it, then **Commit changes**. The site rebuilds itself in about a minute.

| To change… | Edit this file |
|---|---|
| Name, headline, email, LinkedIn/GitHub links | `src/_data/site.json` |
| Home page | `src/index.njk` |
| About / Legal & Research / Athletics | `src/about.md`, `src/research.md`, `src/athletics.md` |
| Résumé PDF | replace `src/assets/Julianna_Lamon_Resume.pdf` (keep the same name) |
| Headshot | replace `src/assets/img/jules-headshot.jpg` |

## Publishing a writing post

Posts live in `src/writing/posts/`. Each starts with a short header:

```yaml
---
title: The Electoral College
date: 2023-10-10
course: American Government, Hillsborough Community College
summary: One sentence that appears on the Writing page.
context: One line about when and why you wrote it.
draft: true
---
```

- `draft: true` means the post is **not** published. Change it to `draft: false` (or delete the line) to publish.
- To add a post, copy an existing file, rename it (e.g. `my-new-post.md`; the name becomes the web address), and replace the text.
- Only publish work that is final and graded, and check with your professor before posting anything from a current course.
- The **Writing** menu item appears automatically once at least one post is published.

## Gallery

The Gallery page shows everything in the Immich album **"Jules – Portfolio"** on photos.lamons.org (Jules is an editor of it). Add or remove photos and videos in the Immich app; the site picks up changes on its daily rebuild, or right away via **Actions → Build and deploy site → Run workflow**.

Only add photos you're happy to be public. Get permission before adding photos or video that show other people's faces, especially minors.

## Previewing on a computer (optional)

```bash
npm install
npm start          # http://localhost:8080 (draft posts are visible here)
npm run build      # what gets published (drafts are left out)
```
