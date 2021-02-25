import { Injectable } from '@angular/core';
import { SectionClass } from '@shared/models/test';
import { ISection } from '@shared/models/test.interface';

@Injectable()
export class TestService {
  getSection() : ISection {
    return new SectionClass('Photos', new Date('1/1/16'));
  }
}
