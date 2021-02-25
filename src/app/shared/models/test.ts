import { ISection } from '@shared/models/test.interface';
export class SectionClass implements ISection {

  public section : Array<any>;
  constructor(public name: string, public updated : Date) {}

  get fullName(): string {
    return 'Aquí llegó ' + this.name;
  }
}
