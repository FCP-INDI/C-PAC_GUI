import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Setup.css';

type Props = {};

export default class Setup extends Component<Props> {
  props: Props;

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
