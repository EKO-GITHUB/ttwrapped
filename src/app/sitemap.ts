export default async function sitemap() {
  const home_page = {
    url: `https://ttwrapped.com`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  const terms = create_default_entry("terms");
  const usage = create_default_entry("usage");

  const all_results = [];
  all_results.push(home_page);
  all_results.push(terms);
  all_results.push(usage);
  return all_results;
}

function create_default_entry(link: string) {
  const website_name = "https://ttwrapped.com";
  return {
    url: `${website_name}/${link}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  };
}
