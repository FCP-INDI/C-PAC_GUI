// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { configLoad } from '../actions/main'

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.configLoad()
  }

  render() {
    const { config: { environments = [] } = {} } = this.props.main;

    return (
      <div>
        <header>
          <img src="../resources/logo.png" />
        </header>
        <main>
          { environments.length === 0 ? null : this.props.children }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
  configLoad,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)