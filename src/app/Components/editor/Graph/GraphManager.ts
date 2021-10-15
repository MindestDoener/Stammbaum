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
      dimension: { width: 200, height: 80 },
      data: {
        customColor: person.gender.color,
        birthDate: this.dateConverter.format(person.birthDate),
        deathDate: person.deathDate
          ? this.dateConverter.format(person.deathDate)
          : undefined,
        toolTipActive: false,
        firstName: person.firstName,
        lastName: person.lastName,
        spouceId: person.spouce,
        gender: person.gender.id,
      },
    };
  }

  public init(familyTree: FamilyTree): void {
    const persons = Array.from(familyTree.persons.values());
    for (const person of persons) {
      const node = GraphManager.createNode(person);
      this.insertNode(node);
      person.node = node;
      this.updateEdges(person);
    }
  }

  insertNode(node: Node) {
    const nodeIndex = this.nodes.indexOf(node);
    const containsNode = nodeIndex > -1;
    const spouceNode = this.nodes.find(
      (spouce) => spouce.id == node.data.spouceId
    );
    const spouceIndex = spouceNode ? this.nodes.indexOf(spouceNode) : -1;
    const containsSpouce = spouceIndex > -1;

    if (containsSpouce) {
      this.nodes.splice(spouceIndex, 0, node);
    }
    if (!containsSpouce && !containsNode) {
      this.nodes.splice(0, 0, node);
    }
  }

  public clear(): void {
    this.nodes = [];
    this.edges = [];
  }

  public updateNode(person: Person): void {
    let node = this.findNodeById(person.id);
    if (node) {
      (node.id = person.id.toString()),
        (node.label = GraphManager.buildLabel(person)),
        (node.dimension = { width: 200, height: 80 }),
        (node.data = {
          customColor: person.gender.color,
          birthDate: GraphManager.dateConverter.format(person.birthDate),
          deathDate: person.deathDate
            ? GraphManager.dateConverter.format(person.deathDate)
            : undefined,
          toolTipActive: false,
          firstName: person.firstName,
          lastName: person.lastName,
          spouceId: person.spouce,
          gender: person.gender.id,
        });
      this.insertNode(node);
      person.node = node;
    }
    this.updateTree();
  }

  public createNewNode(person: Person): void {
    const node = GraphManager.createNode(person);
    person.node = node;
    this.insertNode(node);
    this.updateTree();
  }

  public removeNode(person: Person): void {
    if (person.node) {
      this.edges = this.edges.filter(
        (edge) => +edge.source !== person.id && +edge.target !== person.id
      ); // clear edges
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
          data: {
            spouceId: person.spouce,
          },
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
