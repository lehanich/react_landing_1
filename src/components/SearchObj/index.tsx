import React, { Component } from 'react';

type NoticeProps = {
  msg: string
}

export class Notice extends Component<NoticeProps> {
  static defaultProps = {
    msg: 'Hello everyone!'
  }

  render() {
    return <p>{ this.props.msg }</p>
  }
}

const el = <Notice /> // Will compile in TS 3.0
//https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
