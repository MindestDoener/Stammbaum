import { Edge, Node } from '@swimlane/ngx-graph';
import { treeCurve } from './TreeCurve';
import { TreeLayout } from './TreeLayout';
import { FamilyTree } from '../../../shared/types/familyTree';
import { Person } from '../../../shared/types/person';
import { DateConverter } from '../../../shared/types/dateConverter';

export class GraphManager {

  private static dateConverter: DateConverter = new DateConverter();

  nodes: Node[] = [];
  edges: Edge[] = [];
  curve = treeCurve;
  layout = new TreeLayout();

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
        birthDate: this.dateConverter.format(person.birthDate),
        deathDate: person.deathDate ? this.dateConverter.format(person.deathDate) : undefined,
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

  public clear(): void {
    this.nodes = [];
    this.edges = [];
  }

  public updateNode(person: Person): void {
    const oldNode = this.findNodeById(person.id);
    const newNode = GraphManager.createNode(person);
    person.node = newNode;
    if (oldNode) {
      const index = this.nodes.indexOf(oldNode);
      if (index > -1) {
        this.nodes[index] = newNode;
      }
    }
    this.updateTree();
  }

  public createNewNode(person: Person): void {
    const node = GraphManager.createNode(person);
    person.node = node;
    this.nodes.push(node);
    this.updateTree();
  }

  public removeNode(person: Person): void {
    if (person.node) {
      this.edges = this.edges.filter((edge) => +edge.source !== person.id && +edge.target !== person.id); // clear edges
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
      for (const childId of person.children) {
        const edge: Edge = {
          source: person.id.toString(),
          target: childId.toString(),
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
