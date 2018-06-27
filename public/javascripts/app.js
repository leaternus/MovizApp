var React = require("react");
var Movie = require("./movie");
var { Popover, PopoverHeader, PopoverBody, Container, Row, Col, Card, Button, Nav, NavItem, NavLink } = require('reactstrap');

class App extends React.Component {

  constructor() {
    super();
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { viewOnlyLike : false, movies:[], mymovies:[],popoverOpen: false, moviesSeleted : [] }
  }

  componentDidMount() {
    var ctx = this;
    fetch('./movies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        ctx.setState(
          {movies : data}
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });

    fetch('./mymovies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        ctx.setState(
          {mymovies : data}
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });
  }

  handleClickLikeOn() {
    this.setState({
      viewOnlyLike : true
    })
  }

  handleClickLikeOff() {
    this.setState({
      viewOnlyLike : false
    })
  }

  toggle() {
  this.setState({
    popoverOpen: !this.state.popoverOpen
  });
}

handleClick(moviesName) {
    // this.setState({
    //     moviesSeleted : moviesName
    // });

   var copymoviesSelected = this.state.moviesSeleted.concat();

   copymoviesSelected.push(moviesName +'; ');
   this.setState({
     moviesSeleted: copymoviesSelected
   });
  }


  render() {
    var cardList = [];
    for(var i=0; i<this.state.movies.length; i++){
      var isLike = false;
      for(var y=0; y<this.state.mymovies.length; y++){
        if(this.state.movies[i].id == this.state.mymovies[y].idMovieDB) {
          isLike = true;
          break;
        }
      }

      cardList.push(
        <Movie handleClickParent={this.handleClick} idMovieDB={this.state.movies[i].id} title={this.state.movies[i].title} overview={this.state.movies[i].overview.substr(0, 100)+"..."} poster_path={this.state.movies[i].poster_path} viewOnlyLike={this.state.viewOnlyLike} isLike={isLike}/>
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <Nav>
              <NavItem>
                <NavLink href="#"><img src="./images/logo.png" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOff}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOn}>My movies</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="#">

                <Button color="secondary" id="Popover1" onClick={this.toggle} >
                  11 films
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                  <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                  <PopoverBody>{this.state.moviesSeleted}</PopoverBody>
                </Popover>
              </NavLink>
              </NavItem>
            </Nav>


          </Col>

        </Row>
        <Row>

          {cardList}

        </Row>
      </Container>
    )
  }
}

module.exports = App;
