import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AccessibilityIcon from 'material-ui-icons/Accessibility';

import Content from '../components/Content';
import Header from '../components/Header';
import HeaderText from '../components/HeaderText';

class ProjectsPage extends Component {

  static styles = theme => ({
    card: {
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      // backgroundColor: red[500],
    },
  });

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, project } = this.props;

    return (
      <div>
        <Header>
          <Avatar>{project.name[0]}</Avatar>
          <HeaderText>
            { project.name }
          </HeaderText>
        </Header>
        <Content>
          <Grid container spacing={8} alignContent="center">
            <Grid item sm={6}>
            </Grid>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      <AccessibilityIcon />
                    </Avatar>
                  }
                  // action={
                  //   <IconButton>
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title="Subjects"
                  // subheader="September 14, 2016"
                />
                <CardContent>
                  <Typography component="p">
                    Nº of subjects: 1035
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph variant="body2">
                      Method:
                    </Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                      minutes.
                    </Typography>
                    <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                      cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                      Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                      the rice, and cook again without stirring, until mussels have opened and rice is
                      just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { project } } } = props
  return { project: state.main.config.projects[project] }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectsPage.styles)(ProjectsPage));
