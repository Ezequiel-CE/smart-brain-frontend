import React,{Component} from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecongnition/FaceRecongnition';
import SingIn from '../components/SingIn/SingIn'
import Register from '../components/Register/Register';



// configuracion de las particulas del fondo
const particleOptions={
  "particles": {
      "number": {
          "value": 50,
          "density":{
            "enable": true,
            "value_area":800
          }
      },
      "size": {
          "value": 3
      }
  },
  
};

//estado inicial de la aplicacion
const intialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user:{
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {

  state= intialState;

  //metodo que carga al user
  
  loadUserHandler = (data) =>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }
    })

  }

  // metodo que recibe la respuesta de la app de clary y debuelve un objeto con la posicion del cuadro
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height) 
            };

  }
//metodo que muesta la el cuadro en la cara
  displayBox = (box) => {
    this.setState({box: box})
  }
//metodo que sobrescribe el state del input al escribir
  onInputChangeHandler = (event) =>{
    this.setState({ input:event.target.value})

  }
// realizamos el request al apretar el boton
  onSubmitPictureEventHandler = (event) => {

    this.setState({imageUrl : this.state.input})
    
    fetch('https://evening-brushlands-59335.herokuapp.com/imageurl',{
          method : 'post',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify({
              input: this.state.input
        })
      })
    .then(response => response.json())

    .then(response =>{
      // si clarifi nos manda una respuesta , la utilizamos para cambiar el contador
      if(response){
        fetch('https://evening-brushlands-59335.herokuapp.com/image',{
          method : 'put',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify({
              id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user,{entries : count}))
      })
      .catch(console.log)
      }
      // realiza la identificacion de la cara
      this.displayBox(this.calculateFaceLocation(response))})
    .catch(err => console.log(err));
  }


  // metodo que cambia el route para entrar en la app

onRouteChangeHandler = (route) => {

  if(route === 'signout'){
    
    this.setState(intialState)
    
  }else if (route ==='home'){
    this.setState({isSignedIn:true})
  }

  this.setState({route : route});
}




  render(){

    const {isSignedIn, imageUrl, route, box} =this.state;

    return (
    <div className="App">
      <Particles 
        className='particles'
        params={particleOptions} />
      <Navigation 
      onRouteChange={this.onRouteChangeHandler}
      isSignedIn={isSignedIn}/>
      { route === 'home' 
      ?<div>
      <Logo />
      <Rank
      name={this.state.user.name}
      entries={this.state.user.entries} />
      <ImageLinkForm 
        onInputChange={this.onInputChangeHandler}
        onSubmitButton={this.onSubmitPictureEventHandler}/>
      <FaceRecognition
        imageUrl={imageUrl}
        Facebox={box} />
        </div> 
      
      :(route === 'signin')?
      <SingIn 
      onRouteChange={this.onRouteChangeHandler}
      loadUser={this.loadUserHandler} />
      :
      <Register
      onRouteChange={this.onRouteChangeHandler}
      loadUser={this.loadUserHandler} />
    }
    </div>
  );
}
}

export default App;
