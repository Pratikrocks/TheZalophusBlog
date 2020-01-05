import React from "react"
import { Link } from 'react-router-dom'

export default class blogRedirect extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            name:""
        }
    }
    
    render()
    {
        return(
            <div className="ui main text container mt-4" key={ this.props.key }>
                <div className="ui top attached segment">
                    <div className="ui divided items">
                            <div className="item">
                                <div className="image">
                                    <img className="ui rounded image" src={ this.props.item.image } alt="pic" />
                                </div>
                                <div className="content">
                                        <Link style={{width:"440px",wordWrap:"break-word"}} className="header" to={ '/blog/'+this.props.item._id } >{ this.props.item.title }</Link>
                                    <div className="meta">
                                        <span>{ this.props.item.created.toString(this.props.item.creator.toString()) }</span>
                                    </div>
                                    <div>Written By:{this.state.name}</div>
                                    <div className="description" style={{width:"440px",wordWrap:"break-word"}}>
                                        <p>{ this.props.item.body.substring(0,150) }...</p>
                                    </div>
                                    <div className="extra">
                                        <Link className="ui violet basic button readm" to={ '/blog/'+this.props.item._id }>
                                            Read More
                                            <i className="right chevron icon iconRead"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}