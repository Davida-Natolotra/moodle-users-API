import { Injectable } from '@angular/core';
import { OrganisationUnit } from '../interfaces/ou.interface';

@Injectable({
  providedIn: 'root',
})
export class OrgUnitsService {
  MOCK_ORG_UNITS: OrganisationUnit[] = [
    // Level 2 (Root)
    { id: 'L2A', name: 'Global HQ Alpha', shortName: 'HQA', level: 2 },
    { id: 'L2B', name: 'Global HQ Beta', shortName: 'HQB', level: 2 },

    // Level 3 (Children of L2A)
    { id: 'L3A1', name: 'Region East', shortName: 'RE', parent: { id: 'L2A' }, level: 3 },
    { id: 'L3A2', name: 'Region West', shortName: 'RW', parent: { id: 'L2A' }, level: 3 },
    // Level 3 (Children of L2B)
    { id: 'L3B1', name: 'Region North', shortName: 'RN', parent: { id: 'L2B' }, level: 3 },
    { id: 'L3B2', name: 'Region South', shortName: 'RS', parent: { id: 'L2B' }, level: 3 },

    // Level 4 (Children of L3A1)
    { id: 'L4A1a', name: 'Branch 1, East', shortName: 'B1E', parent: { id: 'L3A1' }, level: 4 },
    { id: 'L4A1b', name: 'Branch 2, East', shortName: 'B2E', parent: { id: 'L3A1' }, level: 4 },
    // Level 4 (Children of L3A2)
    { id: 'L4A2a', name: 'Branch 3, West', shortName: 'B3W', parent: { id: 'L3A2' }, level: 4 },
    // Level 4 (Children of L3B1)
    { id: 'L4B1a', name: 'Branch 4, North', shortName: 'B4N', parent: { id: 'L3B1' }, level: 4 },

    // Level 5 (Children of L4A1a)
    {
      id: 'L5A1a_a',
      name: 'Dept. Finance, B1E',
      shortName: 'DFB1E',
      parent: { id: 'L4A1a' },
      level: 5,
    },
    { id: 'L5A1a_b', name: 'Dept. HR, B1E', shortName: 'DHB1E', parent: { id: 'L4A1a' }, level: 5 },
    // Level 5 (Children of L4B1a)
    {
      id: 'L5B1a_a',
      name: 'Dept. Sales, B4N',
      shortName: 'DSB4N',
      parent: { id: 'L4B1a' },
      level: 5,
    },
  ];
}
