import { selected, alsoBuilt, lab, academic, clients } from "./content";

export type MapProject = {
  key: string; title: string; line: string; tags: string[]; href: string;
  group: "Web & apps" | "ML & AI" | "Interactive" | "Research" | "Clients";
  note?: string;
};
export const mapGroups = ["Web & apps", "ML & AI", "Interactive", "Research", "Clients"] as const;
const work = [...selected, ...alsoBuilt].map(p => ({
  key:p.key, title:p.title, line:p.line, tags:p.tags,
  href:p.caseSlug ? `/case/${p.caseSlug}` : p.links[0].href,
  group:(p.key==="habitat" ? "Interactive" : p.key==="travelease" ? "Web & apps" : "ML & AI") as MapProject["group"],
}));
const entries: MapProject[] = [
  ...work,
  ...lab.map(p=>({key:p.key,title:p.title,line:p.line,tags:p.tags,href:p.extra?.href || p.href,group:"Interactive" as const})),
  ...academic.map(p=>({key:p.key,title:p.title,line:p.line,tags:p.tags,href:p.links[0].href,
    group:(["ultrasound","resilience"].includes(p.key) ? "Research" : p.key==="mlp" ? "ML & AI" : "Web & apps") as MapProject["group"],note:p.shared || p.role})),
  ...clients.map(p=>({key:p.key,title:p.title,line:p.line,tags:[p.kind],href:p.live,group:"Clients" as const,note:p.status==="demo" ? "Concept presented to prospective clients" : "Delivered client website"})),
  {key:"flyrank",title:"FlyRank",line:"Content-refresh research from my machine learning internship: rule baselines, client-grouped validation, and a reproducible report.",tags:["Python","scikit-learn","Evaluation"],href:"/case/flyrank",group:"ML & AI",note:"Machine learning internship"},
];
export const allProjects = Array.from(entries.reduce((map,p)=>map.has(p.key)?map:map.set(p.key,p),new Map<string,MapProject>()).values());
export const showcaseKeys = ["habitat","leakagelens","travelease","flyrank"];
export const showcase = showcaseKeys.map(key=>allProjects.find(p=>p.key===key)!);
export const projectPositions = allProjects.map(p=>{
  const peers=allProjects.filter(n=>n.group===p.group);
  return {x:10+mapGroups.indexOf(p.group)*20,y:19+peers.indexOf(p)*10.4};
});
