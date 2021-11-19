import { Edge, Graph, Layout } from '@swimlane/ngx-graph';
import * as dagre from 'dagre';
import { makeUUID } from '../../../shared/types/uuid';

export enum Orientation {
  LEFT_TO_RIGHT = 'LR',
  RIGHT_TO_LEFT = 'RL',
  TOP_TO_BOTTOM = 'TB',
  BOTTOM_TO_TOM = 'BT',
}

export enum Alignment {
  CENTER = 'C',
  UP_LEFT = 'UL',
  UP_RIGHT = 'UR',
  DOWN_LEFT = 'DL',
  DOWN_RIGHT = 'DR',
}

export interface DagreSettings {
  orientation?: Orientation;
  marginX?: number;
  marginY?: number;
  edgePadding?: number;
  rankPadding?: number;
  nodePadding?: number;
  align?: Alignment;
  acyclicer?: 'greedy';
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
  multigraph?: boolean;
  compound?: boolean;
}

export class TreeLayout implements Layout {
  defaultSettings: DagreSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 50,
    marginY: 50,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    multigraph: true,
    compound: true,
  };
  settings: DagreSettings = {};

  dagreGraph: any;
  dagreNodes: any;
  dagreEdges: any;

  private static getMiddle(a: number, b: number): number {
    return Math.min(a, b) + Math.abs(a - b) / 2;
  }

  run(graph: Graph): Graph {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);

    graph.edgeLabels = this.dagreGraph._edgeLabels;

    // tslint:disable-next-line:forin
    for (const dagreNodeId in this.dagreGraph._nodes) {
      const dagreNode = this.dagreGraph._nodes[dagreNodeId];
      const node = graph.nodes.find((n) => n.id === dagreNode.id);
      if (node) {
        node.position = {
          x: dagreNode.x,
          y: dagreNode.y,
        };
        node.dimension = {
          width: dagreNode.width,
          height: dagreNode.height,
        };
      }
    }

    for (const entry of Object.entries(graph.edgeLabels)) {
      // important, otherwise faulty points are set for edges
      this.updateEdge(graph, entry[1] as Edge);
    }

    return graph;
  }

  updateEdge(graph: Graph, edge: Edge): Graph {
    const sourceNode = graph.nodes.find((n) => n.id === edge.source);
    const targetNode = graph.nodes.find((n) => n.id === edge.target);
    const spouseNode = graph.nodes.find((n) => n.id === edge.data.spouseId);
    let endingPoint;
    let startingPoint;
    let middlePoint;
    let middlePoint1;
    if (
      sourceNode &&
      targetNode &&
      sourceNode.position &&
      targetNode.position &&
      sourceNode.dimension &&
      targetNode.dimension
    ) {
      const yDir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
      if (spouseNode && spouseNode.position && spouseNode.dimension) {
        const spouseDir =
          sourceNode.position.x <= spouseNode.position.x ? -1 : 1;
        startingPoint = {
          x:
            sourceNode.position.x -
            spouseDir * (spouseNode.dimension.width / 2),
          y: sourceNode.position.y,
        };
        middlePoint1 = {
          x: TreeLayout.getMiddle(sourceNode.position.x, spouseNode.position.x),
          y: sourceNode.position.y,
        };
        middlePoint = {
          x: TreeLayout.getMiddle(sourceNode.position.x, spouseNode.position.x),
          y: TreeLayout.getMiddle(sourceNode.position.y, targetNode.position.y),
        };
        endingPoint = {
          x: targetNode.position.x,
          y: targetNode.position.y + yDir * (targetNode.dimension.height / 2),
        };
      } else {
        startingPoint = {
          x: sourceNode.position.x,
          y: sourceNode.position.y - yDir * (sourceNode.dimension.height / 2),
        };
        middlePoint = {
          x: TreeLayout.getMiddle(sourceNode.position.x, targetNode.position.x),
          y: TreeLayout.getMiddle(sourceNode.position.y, targetNode.position.y),
        };
        middlePoint1 = {
          x: TreeLayout.getMiddle(sourceNode.position.x, targetNode.position.x),
          y: TreeLayout.getMiddle(sourceNode.position.y, targetNode.position.y),
        };
        endingPoint = {
          x: targetNode.position.x,
          y: targetNode.position.y + yDir * (targetNode.dimension.height / 2),
        };
      }
    }
    // generate new points
    edge.points = [startingPoint, middlePoint1, middlePoint, endingPoint];

    return graph;
  }

  createDagreGraph(graph: Graph): any {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph,
    });

    // noinspection TypeScriptValidateJSTypes
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound,
    });

    // Default to assigning a new object as a label for each new edge.
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });

    this.dagreNodes = graph.nodes.map((n) => {
      const node: any = Object.assign({}, n);
      if (n && n.dimension && n.position) {
        node.width = n.dimension.width;
        node.height = n.dimension.height;
        node.x = n.position.x;
        node.y = n.position.y;
      }
      return node;
    });

    this.dagreEdges = graph.edges.map((l) => {
      const newLink: any = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = makeUUID();
      }
      return newLink;
    });

    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }

      // update dagre
      this.dagreGraph.setNode(node.id, node);
    }

    // update dagre
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }

    return this.dagreGraph;
  }
}
