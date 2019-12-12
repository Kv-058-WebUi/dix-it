import React from 'react'
import './PlayerListElement.scss'

export interface pleParams {
  img: any;
  name: string;
  score: any;
  // colorid: string;
  // index: number
}


export class PlayerListElement extends React.Component<any, pleParams> {

  constructor(props: pleParams) {
      super(props);
  }
  render(){
  return(
    <div className="PlayerListElement">
    <img className="PlayerAvatar" src={this.props.img}/>
    <h1 className="PlayerName "/* this.props.color */>{this.props.name}</h1>
    <h1 className="PlayerScore">{this.props.score}</h1>
  </div>
)
  }
}