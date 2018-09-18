import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const particaleOptions ={
                particles: {
                  number: {
                    value :50,
                    density :{
                      enable :true,
                      value_area :400
                    }
                  }
                }
              };

const app = new Clarifai.App
    ({
      apiKey: 'ab005b7b595f4ffebad78b2a2f095761'
    });


class App extends Component {
  constructor(){
    super();
    this.state = {
      input :'',
      imgUrl :'',
      box :{},
      route :'Signin',
    }
  }
   calculateFaceLocation = (data) =>{
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('InputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }
   };

  displayFaceBox = (box)=>{
    this.setState({box: box});
   };
  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  };
  onButtonSubmit = ()=>{
    this.setState({imgUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  };
  onRouteChange = (route) =>{
    this.setState({route:route})
  };
  render() {
    return (
      <div className="App">
      <Particles className="Particles"
              params={particaleOptions}
            />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route==="Signin"
            ?
            <Signin onRouteChange={this.onRouteChange} />
            : (this.state.route==="home"
              ?
              <div>
                <Logo />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
              </div>
              :
              <Register />
             )

        }
      </div>
    );
  }
}

export default App;
