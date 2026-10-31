// Drafts (`draft: true` in a page's front matter) appear in `npm start` previews but are never published by `npm run build`.
const isPublishBuild = () => process.env.ELEVENTY_RUN_MODE === "build";
const isHidden = (data) => data.draft === true && isPublishBuild();

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (isHidden(data)) return false;
  });

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/writing/posts/*.md")
      .filter((post) => !isHidden(post.data))
      .sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" }),
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
