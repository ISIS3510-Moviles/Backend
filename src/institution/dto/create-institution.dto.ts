export class CreateInstitutionDto {
  name: string;
  description: string;
  buildingsIds?: string[];
  membersIds?: string[];
}
