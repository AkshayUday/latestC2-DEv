import React from 'react';

class Image extends React.Component {
  render() {
    let name = this.props.name;
    let text = this.props.text;
    let height = this.props.height;
    let width = this.props.width;

    return (
      <img src={name} alt={text} height={height} width={width} />
  )
  }

};

Image.propTypes = {
  name: React.PropTypes.string,
  text: React.PropTypes.string,
  height: React.PropTypes.string,
  width: React.PropTypes.string
}

module.exports = Image;
