export interface OrganisationUnit {
  id: string;
  shortName: string | null;
  name: string | null;
  path: string | null;
  level: number | null;
  openingDate: Date | null;
  closedDate: Date | null;
  created: Date;
  lastUpdated: Date;
  createdBy: string | null;
  lastUpdatedBy: string | null;
  parent_id: string | null;
  parent?: OrganisationUnit | null;
  attributeValues: string;
  translations: string;
}

export type OrgUnitState = {
  data: OrganisationUnit[];
  loading: boolean;
  error: string | null;
};
