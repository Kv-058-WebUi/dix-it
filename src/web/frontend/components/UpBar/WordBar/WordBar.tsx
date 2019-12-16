import React from 'react'
import './WordBar.scss'

export interface wordParams {
  word: string;
}


export class WordBar extends React.Component<any, wordParams> {

  constructor(props: wordParams) {
      super(props);
  }
  render(){
  return(
  <h3 className="Word">{this.props.word}</h3>
)
  }
}