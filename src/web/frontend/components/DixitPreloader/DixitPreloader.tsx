import React from "react"
import './DixitPreloader.scss'

interface DixitPreloaderProps {
    monochrome: boolean
}

export default class DixitPreloader extends React.Component<DixitPreloaderProps> {
    static defaultProps = { monochrome: false};
    
    render() {
        const { monochrome } = this.props;

        return (
            <div className='sk-three-bounce'>
                <div className={`sk-bounce-1 sk-child ${monochrome ? 'monochrome' : ''}`}></div>
                <div className={`sk-bounce-2 sk-child ${monochrome ? 'monochrome' : ''}`}></div>
                <div className={`sk-bounce-3 sk-child ${monochrome ? 'monochrome' : ''}`}></div>
            </div>
        )
    }
};
