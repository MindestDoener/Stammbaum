import { Edge, Node } from '@swimlane/ngx-graph';
import { FamilyTree, Person } from '../../shared/types';

export class GraphManager {
  nodes: Node[] = [];
  edges: Edge[] = [];

  private static buildLabel(person: Person): string {
    return person.firstName + ' ' + person.lastName;
  }

  private static createNode(person: Person): Node {
    return {
      id: person.id.toString(),
      label: GraphManager.buildLabel(person),
      dimension: { width: 200, height: 40 },
      data: {
        customColor: person.gender.color,
        birthDate: person.birthDate,
        deathDate: person.deathDate,
        toolTipActive: false,
      },
    };
  }

  public init(familyTree: FamilyTree): void {
    const persons = familyTree.persons.values();
    for (const person of persons) {
      const node = GraphManager.createNode(person);
      this.nodes.push(node);
      person.node = node;
      this.updateEdges(person);
    }
  }

  public updateNode(person: Person): void {
    const oldNode = this.findNodeById(person.id);
    const newNode = GraphManager.createNode(person);
    person.node = newNode;
    if (oldNode) {
      const index = this.nodes.indexOf(oldNode);
      if (index > -1) {
        this.nodes[index] = newNode;
        this.updateTree();
      }
    }
  }

  public createNewNode(person: Person): void {
    const node = GraphManager.createNode(person);
    person.node = node;
    this.nodes.push(node);
    this.updateTree();
  }

  public removeNode(person: Person): void {
    if (person.node) {
      const index = this.nodes.indexOf(person.node, 0);
      if (index > -1) {
        this.nodes.splice(index, 1);
        this.updateTree();
      }
    }
  }

  public updateEdges(person: Person): void {
    this.edges = this.edges.filter((edge) => +edge.source !== person.id); // clear existing edges
    if (person.children) {
      for (const child of person.children) {
        const edge: Edge = {
          source: person.id.toString(),
          target: child.id.toString(),
        };
        this.edges.push(edge);
      }
    }
    this.updateTree();
  }

  public findNodeById(id: number): Node | undefined {
    return this.nodes.find((node) => +node.id === id);
  }

  private updateTree(): void {
    this.nodes = [...this.nodes];
    this.edges = [...this.edges];
  }
}
