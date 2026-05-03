import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/locales";

const routes = ["", "/projects", "/contact", "/start", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const getChangeFrequency = (route: string) =>
    (route === "" ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"];

  const defaultRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: getChangeFrequency(route),
    priority: route === "" ? 1 : 0.8,
  }));

  const localizedRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency(route),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  return [...defaultRoutes, ...localizedRoutes];
}
