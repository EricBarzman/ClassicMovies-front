export const topicsList = [
  { id: 1, label: "report", label_text: "Signaler un problème" },
  { id: 1, label: "sayHi", label_text: "Nous dire bonjour" },
  { id: 2, label: "jobs", label_text: "Chercher du travail" }
]

export interface ITopic {
  id: number;
  label: string;
  label_text: string;
}