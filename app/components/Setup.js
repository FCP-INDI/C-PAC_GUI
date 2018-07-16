import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Setup.css';

export default class Setup extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
        Hello
        </div>
      </div>
    );
  }
}
