import { FamilyTree, Gender, Person } from './types';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class TestData {
  static testSon: Person = {
    id: 1243,
    firstName: 'Sören',
    lastName: 'Sohn',
    gender: Gender.MALE,
    birthDate: new NgbDate(2010, 1, 1),
  };
  static testDaughter: Person = {
    id: 1432,
    firstName: 'Tanja',
    lastName: 'Tochter',
    gender: Gender.FEMALE,
    birthDate: new NgbDate(2010, 1, 1),
  };
  static testDiverseKid: Person = {
    id: 6969,
    firstName: 'AEX12rÈ',
    lastName: 'Abkömmling',
    gender: Gender.DIVERSE,
    birthDate: new NgbDate(2015, 4, 20),
  };
  static testFather: Person = {
    id: 1234,
    firstName: 'Volker',
    lastName: 'Vater',
    gender: Gender.MALE,
    birthDate: new NgbDate(2000, 1, 1),
    children: [TestData.testSon, TestData.testDaughter, TestData.testDiverseKid],
  };
  static testMother: Person = {
    id: 1324,
    firstName: 'Marianne',
    lastName: 'Mutter',
    gender: Gender.FEMALE,
    birthDate: new NgbDate(2000, 1, 1),
    children: [TestData.testSon, TestData.testDaughter, TestData.testDiverseKid],
  };
  static testGrandFather: Person = {
    id: 1111,
    firstName: 'Gustaf',
    lastName: 'Großvater',
    gender: Gender.MALE,
    birthDate: new NgbDate(1969, 1, 1),
    deathDate: new NgbDate(2020, 1, 1),
    children: [TestData.testFather],
  };
  static testGrandMother: Person = {
    id: 2222,
    firstName: 'Gundula',
    lastName: 'Großmutter',
    gender: Gender.FEMALE,
    birthDate: new NgbDate(1420, 1, 1),
    deathDate: new NgbDate(2010, 1, 1),
    children: [TestData.testFather],
  };

  static testPersons: Map<number, Person> = new Map<number, Person>([
    [1111, TestData.testGrandFather],
    [2222, TestData.testGrandMother],
    [1234, TestData.testFather],
    [1324, TestData.testMother],
    [1243, TestData.testSon],
    [1432, TestData.testDaughter],
    [6969, TestData.testDiverseKid],
  ]);

  static testList: Map<string, FamilyTree> = new Map<string, FamilyTree>([
    ['0', { id: '0', name: 'Stammbaum1', persons: new Map(TestData.testPersons) }],
    ['1', { id: '1', name: 'Stammbaum2', persons: new Map() }],
    ['2', { id: '2', name: 'Stammbaum3', persons: new Map() }],
    ['3', { id: '3', name: 'Stammbaum4', persons: new Map() }],
  ]);
}
