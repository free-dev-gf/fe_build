import React from "react";
import { hot } from 'react-hot-loader/root';
export interface HelloProps { compiler: string; framework: string; }

class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

export default hot(Hello);