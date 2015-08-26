var Content = React.createClass({
  getInitialState: function() {
    return({query: '', data: []})
  },
  getResults: function(data) {
    this.setState({data: this.state.data}, function() {
      $.ajax({
        url: 'http://127.0.0.1:3000/api/v1/search?term=' + data.query,
        type: 'get',        
        dataType: 'json',
        success: function(data) {
          console.log(data)
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  render: function(){
    return (
      <div>
      <div className='jumbotron'>
        <SearchBar handleQuery={this.getResults} query={this.state.query}/>
      </div>
      <ResultPanels info={this.state.data}/>
    </div>
    )
  }
});

var SearchBar = React.createClass({
  handleSubmit: function(event){
    event.preventDefault()
    var query = React.findDOMNode(this.refs.query).value.trim()
    this.props.handleQuery({query: query})
  },

  render: function(){
    return (
      <div className='container'>
      <form className="input-group" onSubmit={this.handleSubmit}>
        <input type='text' className='form-control' ref='query'/>
        <span className="input-group-btn">
          <button className="btn btn-primary" type="submit" value='Post'>Search</button>
        </span>
      </form>
      </div>
    )
  }
});

var ResultPanels = React.createClass({
  render: function() {
    if (this.props.info.businesses !== undefined) {
      var panel = this.props.info.businesses.map(function(result, index) {
        console.log(result)
        return (
          <div className='thumbnail'>
            <h4>{result.name}</h4>
          </div>
        );
      });
      return(
        <div>{panel}</div>
      );
    } else {
      return(false)
    }
  }
}); 

React.render(
  <Content/>,document.getElementById('content')
)