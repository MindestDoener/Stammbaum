import { GraphManager } from '../GraphManager';
import { Node } from '@swimlane/ngx-graph';
import { Gender } from '../../../../shared/types/gender';
import { TestData } from '../../../../shared/types/test/testData';

describe('GraphManager', () => {
  let graphManager: GraphManager;

  beforeEach(() => {
    graphManager = new GraphManager();
  });

  const testFatherNode: Node = {
    id: '1234',
    label: 'Volker Vater',
    dimension: { width: 200, height: 80 },
    data: {
      customColor: Gender.MALE.color,
      birthDate: '1.1.2000',
      deathDate: undefined,
      toolTipActive: false,
      firstName: 'Volker',
      lastName: 'Vater',
      spouseId: undefined,
      gender: Gender.MALE.id,
    },
  };

  describe('createNode', () => {

    it('should create Node correctly', () => {
      graphManager.createNewNode(TestData.testFather);
      expect(graphManager.nodes[0]).toEqual(testFatherNode);
    });

  });

  describe('init', () => {

    it('should create 7 nodes', () => {
      graphManager.init(TestData.testTree);
      expect(graphManager.nodes).toHaveSize(7);
    });

    it('should create 8 edges', () => {
      graphManager.init(TestData.testTree);
      expect(graphManager.edges).toHaveSize(8);
    });

  });

  describe('removeNode', () => {

    it('should remove the node and its related edges', () => {
      graphManager.init(TestData.testTree);
      graphManager.removeNode(TestData.testFather);
      expect(graphManager.nodes).toHaveSize(6);
      expect(graphManager.edges).toHaveSize(3);
    });

  });

});
