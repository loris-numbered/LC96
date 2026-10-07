// TODO: MIGRATE TO SANITY
import data from "~/data.json";

export const { site, helloworld, projects } = data;

export type Project = (typeof projects)[number];

export function findProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
