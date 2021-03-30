import React, { Component } from "react";
import Model from "./model";


export default class Page extends Component {


    buttonClick=()=>{
        console.log("Page clicked")
    }

    render() {
        const data = this.props.data
        return (
            <div className={"row"} style={{ backgroundColor: "#404040", height: "95vh", width: "200vh" }}>

                <div className={"col-md-6"} style={{padding:40}}>
                    <button onClick={()=>this.buttonClick()}>tıkla</button>
                {
                data.map((data) => (
                    <div key={data} style={{color:"white",fontSize:40}}>
                        {data}
                    </div>
                ))
                }
                </div>
                <div  className={"col-md-6"} style={{backgroundColor: "#808080",padding:40}}>
                    <div style={{height: "200", width: "200"}}>
                        {/* <Model angle={data%180}/> */}
                    </div>
                </div>
            </div>
        );
    }
}
