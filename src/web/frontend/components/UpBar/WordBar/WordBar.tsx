import React from 'react'
import './WordBar.scss'
import { CombinedStateInterface } from '../../../redux/reducer/combineReducer';
import { connect } from 'react-redux';

export interface wordParams {
  word: string;
}

class WordBar extends React.Component<wordParams, wordParams> {

  constructor(props: wordParams) {
    super(props);
  }
  render() {
    return (
      <h3 className="Word">{this.props.word}</h3>
    )
  }
}

function mapStateToProps(state: CombinedStateInterface) {
  return {
    word: state.gamePageStore.word,
  }
}

const reduxWordBar = connect(mapStateToProps)(WordBar);
export { reduxWordBar as WordBar }