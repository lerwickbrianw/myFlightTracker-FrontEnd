import React, { Component } from "react";
import "./Home.css";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Axios from "axios";
const containerStyle = {
  width: "100%",
  height: "800px",
};
const center = {
  lat: 43.43,
  lng: -88.7,
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neLat: "43.8276067",
      neLng: "-89.8027526",
      swLat: "43.029763",
      swLng: "-87.597247",
      activeFlights: [],
      selectedFlight: null,
      infoOpen: false,
    };
  }
  componentDidMount = async () => {
    const response = await Axios.get(
      `https://Cherokee235:Ilike2Fly@opensky-network.org/api/states/all?lamin=${this.state.swLat}&lomin=${this.state.neLng}&lamax=${this.state.neLat}&lomax=${this.state.swLng}`
    );
    this.setState({
      activeFlights: response.data.states,
    });
    console.log(this.state.activeFlights[0][1]);
  };
  getMapExtents = () => {
    let ne = this.map.getBounds().getNorthEast();
    let sw = this.map.getBounds().getSouthWest();
    console.log(ne.lat() + ";" + ne.lng());
    console.log(sw.lat() + ";" + sw.lng());
    this.setState({
      neLat: ne.lat(),
      neLng: ne.lng(),
      sw: sw.lat(),
      sw: sw.lng(),
    });
  };
  render() {
    const activeFlights = this.state.activeFlights.map((flight, index) => {
      return (
        <div className="flights" key={flight.index}>
          <div className="divf">{flight[0]}</div>
          <div className="divf">{flight[1]}</div>
          <div className="divf">{flight[2]}</div>
          <div className="divf">{flight[7]}</div>
          <div className="divf">{flight[8]}</div>
          <div className="divf">{flight[9]}</div>
          <div className="divf">{flight[10]}</div>
          <div className="divf">{flight[11]}</div>
        </div>
      );
    });
    return (
      <div>
        <div className="activeFlights">
          <div className="flightTxt">Active Flights</div>
          <div className="flightcontainer">
            <div className="flightheading">
              <div className="divf">ICAO24</div>
              <div className="divf">Tail Number</div>
              <div className="divf">Origin</div>
              <div className="divf">Baro Altitude</div>
              <div className="divf">On Ground</div>
              <div className="divf">Velocity</div>
              <div className="divf">True Track</div>
              <div className="divf">Verticle Rate</div>
            </div>
            <div className="flightdetailscontainer">{activeFlights}</div>
          </div>
        </div>
        <LoadScript googleMapsApiKey="AIzaSyBxarPXcJpq8mYO-JH6XwEIFr7EwljDAaY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={this.handleMapLoad}
          >
            {this.state.activeFlights.map((flight) => (
              <Marker
                icon={"http://maps.google.com/mapfiles/kml/pal2/icon56.png"}
                key={flight[0]}
                position={{
                  lat: flight[6],
                  lng: flight[5],
                }}
                onClick={(e) => {
                  this.setState({
                    selectedFlight: flight,
                    infoOpen: !this.state.infoOpen,
                  });
                }}
              />
            ))}
            {this.state.infoOpen && this.state.selectedFlight && (
              <InfoWindow
                onCloseClick={() => this.setState({ infoOpen: false })}
                position={{
                  lat: this.state.selectedFlight[6],
                  lng: this.state.selectedFlight[5],
                }}
              >
                <div>
                  <h1>{this.state.selectedFlight[1]}</h1>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
export default Home;
