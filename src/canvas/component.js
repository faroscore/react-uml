// @flow

import React from 'react';
import style from 'styled-components';
import { connect } from 'react-redux';
import Entity from '../entity/component';
import { setEntities } from '../entity/reducer';
import Panel from '../panel/component';

import type { CanvasState, CanvasAction } from '../canvas/reducer';
import type { EntityState, EntityAction } from '../entity/reducer';
import type { State } from '../diagram/reducer';

/*
 * Presentational
 * ==================================== */

const CanvasStyle = style.div`
  position: relative;
  background-color: #eee;
  flex: 1 0;

  & * {
    box-sizing: border-box;
  }
  & ul,
  & ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

type CanvasProps = {
  entities: EntityState,
};
const Canvas = (props: CanvasProps) => (
  <CanvasStyle>
    <Panel />
    {props.entities.map(entity => <Entity key={entity.id} {...entity} />)}
  </CanvasStyle>
);

/*
 * Container
 * ==================================== */

type CanvasContainerProps = {
  entities: EntityState,
  model: EntityState,
  setEntities: EntityState => EntityAction,
};
class CanvasContainer extends React.PureComponent<CanvasContainerProps> {
  componentDidMount() {
    this.props.setEntities(this.props.model);
  }

  render() {
    return <Canvas entities={this.props.entities} />;
  }
}

const mapStateToProps = (state: State) => ({ entities: state.entity });

export default connect(mapStateToProps, { setEntities })(CanvasContainer);
