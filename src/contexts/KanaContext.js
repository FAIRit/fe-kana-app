import React, { Component, createContext } from "react";
import { restGetKana } from "../services/kana";

const initialContextValue = {
  kanaTable: [],
};

const KanaContext = createContext(initialContextValue);

export default KanaContext;

export class KanaProvider extends Component {
  state = initialContextValue;

  componentDidMount = () => {
    restGetKana().then((kanaTable) => {
      this.setState({
        kanaTable,
      });
    });
  };

  render() {
    const { children } = this.props;
    return (
      <KanaContext.Provider value={this.state}>{children}</KanaContext.Provider>
    );
  }
}
