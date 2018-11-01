import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Setup.css';

export default class Setup extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.container} data-tid="container">
        Hello
        </div>
      </React.Fragment>
    );
  }
}
