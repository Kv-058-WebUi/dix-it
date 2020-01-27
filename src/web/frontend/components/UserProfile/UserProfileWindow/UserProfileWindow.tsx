import React, { Component, useContext } from 'react';
import UserProvider from '../../UserProvider/UserProvider';
import path from 'path';
import './UserProfileWindow.scss'
import ReactWordcloud , {MinMaxPair, OptionsProp, Scale, Spiral} from 'react-wordcloud'
import ReactTooltip from 'react-tooltip'



const options: OptionsProp = {
    enableTooltip: false,
    deterministic: false,
    fontFamily: 'Roboto',
    fontSizes: [20, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    rotations: 3,
    rotationAngles: [-90, 90],
    scale: Scale.Sqrt,
    spiral: Spiral.Archimedean,
    transitionDuration: 2000,
};

const size:MinMaxPair = [1400,350]
var localwords = localStorage.getItem('word');
if (!localwords){localwords ='word word'}
var arraywords = localwords.split(' ');
let words = arraywords.map((word, i) => ({text: word, value: i}))


export default class UserProfileWindow extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <UserProvider.context.Consumer>{context => (
                <React.Fragment>
                    {context.user && context.user.authenticated
                        ? (<React.Fragment>
                            <div className="mainwindow">
                            <div className="UserWindow">
                                <img alt='profile picture' src={path.normalize(`images/avatars/${context.user.profile_picture || 'aonymous_user.png'}`)}/>
                                <p className="Online">Online</p>
                            </div>
                            <div className="Name">{context.user.nickname}</div>
                            <div className="email">{context.user.email}</div>
                            <div className="lastO"><span className="InfoText GT">Last Online:</span><span className="InfoText WT">{context.user.lastonline.toDateString()}</span></div>
                            <div className="createdA"><span className="InfoText GT">You joined us in:</span><span className="InfoText WT">{context.user.created_at.toDateString()}</span></div>
                            <div className="idNum" data-tip="But #1 in our hearts"><span className="InfoText GT">You our #</span><span className="InfoText WT">{context.user.user_id}</span><span className="InfoText GT"> user</span></div> <ReactTooltip />
                            <div className="WordMap">↓ Your WordMap ↓</div>
                            {arraywords.length>20 
                                ? (<div className="words"><ReactWordcloud options ={options} words={words} size={size}/></div>)
                            : <div className="YouPass"><img alt='You shall not pass' height='307' width='772'src ='https://steamuserimages-a.akamaihd.net/ugc/860609586090380052/A0113A5A0B3191E96C697C34CC34F390775B37FB/'/><p className="PlayMore">You haven't play enough to see this. Return with more battle experience</p></div>}
                            </div>
                            </React.Fragment>)
                        : ''}
                </React.Fragment>
            )}</UserProvider.context.Consumer>
        );
    }
};