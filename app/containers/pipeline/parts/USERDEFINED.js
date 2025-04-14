handleNew = (this, newWhat) => {
  const { classes, configuration, onChange } = this.props
  let items = configuration.getIn([`${newWhat}s`]);
  items = items.push(fromJS({
    Name: `${newWhat} ${items.size + 1}`
  }));

  this.handleChange(items, this.onChange);
  this.setState({ this.edit: items.size - 1 });
};
