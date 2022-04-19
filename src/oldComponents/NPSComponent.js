import React from "react";
import Park from "./Park";
import NPSService from "../services/NPSService";

const wacoLat = "31.559814";
const wacoLon = "-97.141800";

class NPSComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parks: [], longitude: wacoLon, latitude: wacoLat, activities: '', fee: 5, scores: [], sortType: 0};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.sortByFee = this.sortByFee.bind(this);
        //this.sortByLocation = this.sortByLocation.bind(this);
        //this.resetSort = this.resetSort.bind(this);
        this.sort = this.sort.bind(this);
    }
    handleChangeStatus(event) {
        this.setState({level: event.target.value});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.sort();
    }

    componentDidMount() {
        let parkdata = [];
        NPSService.getParkInfo().then((response) => {
            response.data.data.map((park) =>
                parkdata.push(
                    new Park(
                        park.fullName,
                        park.activities.length,
                        park.activities,
                        (park.entranceFees.length > 0) ? park.entranceFees[0].cost : 0,
                        park.latitude,
                        park.longitude,
                    )
                )
            );
            this.setState({ parks: parkdata });
        });
    }

    calculateDistance(slat1, long1, slat2, long2) {
        let R = 3950; // km
        let dLat = this.toRad(parseFloat(slat2) - parseFloat(slat1));
        let dLong = this.toRad(parseFloat(long2) - parseFloat(long1));
        let lat1 = this.toRad(slat1);
        let lat2 = this.toRad(slat2);

        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Converts numeric degrees to radians
    toRad(value) {
        return (parseFloat(value) * Math.PI) / 180;
    }

    calculateScore(park) {
        let distance = this.calculateDistance(this.state.latitude, this.state.longitude, park.lat, park.long);
        let activityCount = park.numOfActivities;
        let cost = park.price;

        let score = 0;
        if(distance <= 50) {
            score += 100;
        }else if (distance <= 100) {
            score += 50;
        } else if (distance <= 250) {
            score += 25;
        } else if (distance <= 750) {
            score += 10;
        }

        score += activityCount < 25 ? activityCount * 2 : 50;
        
        if (cost <= this.state.fee) {
            score += 50;
        } else if (cost <= this.state.fee * 2) {
            score += 25;
        } else if (cost <= this.state.fee * 3) {
            score += 5;
        }

        for (let j = 0; j < park.activities.length; j++) {
            let a = this.CSVtoArray(this.state.activities)
            for (let k = 0; k < a.length; k++) {
                if(a[k] === (park.activities[j].name)){
                    score += 10;
                }
            }
        }

        return score;
    }

    CSVtoArray(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!re_valid.test(text)) return null;
        var a = [];                     // Initialize array to receive values.
        text.replace(re_value, // "Walk" the string using replace with callback.
            function(m0, m1, m2, m3) {
                // Remove backslash from \' in single quoted values.
                if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                // Remove backslash from \" in double quoted values.
                else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                else if (m3 !== undefined) a.push(m3);
                return ''; // Return empty string.
            });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text)) a.push('');
        return a;
    };
    /*handleSubmit(event) {
        event.preventDefault();
        //this.setState({activities: []});
    }*/

    sortByFee() {
        this.setState({ sortType: 1 });
        this.sort();
    }

    sortByLocation() {
        this.setState({ sortType: 2 });
        this.sort();
    }

    resetSort() {
        this.setState({ sortType: 0 });
        this.sort();
    }

    sort() {
        let parkData = this.state.parks;
        /*
        switch (this.state.sortType) {
            case 1:
                parkData = [].concat(this.state.parks).sort((a, b) => a.price - b.price);
                break;
            case 2:
                parkData = [].concat(this.state.parks).sort((a, b) => a.lat - b.lat);
                break;
            default:
                parkData = []
                    .concat(this.state.parks)
                    .sort((a, b) => a.fullName.localeCompare(b.fullName));
                break;
        }
        */

        parkData = [].concat(this.state.parks).sort((a, b) =>  this.calculateScore(b) - this.calculateScore(a));
        this.setState({ parks: parkData });
    }

    render() {
        return (
            <div>
                <div>
                    <h4>Search:</h4>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Activities:
                        </label>
                        <div>
                            <input name = "activities" placeholder= "activities" value={this.state.activities} type="text" onChange={this.handleInputChange} />
                        </div>
                        <br></br>
                        <div><b>Distance</b></div>
                        <label>
                            Latitude:
                        </label>
                        <div>
                            <input name = "latitude" placeholder= "Latitude" value={this.state.latitude} type="text" onChange={this.handleInputChange} required />
                        </div>
                        <label>
                            Longitude:
                        </label>
                        <div className="form-group">
                            <input name = "longitude" className="form-control" placeholder= "Longitude" value={this.state.longitude} type="text" onChange={this.handleInputChange} required />
                        </div>


                        <br></br>
                        <div><b>Price (Fee)</b></div>
                        <div>
                            <input name = "fee" placeholder= "Fee" value={this.state.fee} type="text" onChange={this.handleInputChange} />
                        </div>
                        <div></div>
                        {/*<input type="submit" value="Submit" />*/}
                    </form>

                    <label>{this.state.message}</label>
                </div>
                <div>
                    <h1>National Park Service Data</h1>
                </div>
                <div>
                    <button onClick={this.sort}>Sort</button>
                </div>
                {<div>{this.state.parks.length}</div>}
                <div>{this.state.sortType}</div>
                {this.state.parks?.map((park) => (
                    <div>
                        {park.fullName} | {park.numOfActivities} | {park.price} |
                        {this.calculateDistance(this.state.latitude, this.state.longitude, park.lat, park.long)} |
                        {<b>{this.calculateScore(park)}</b>}
                    </div>
                ))}
            </div>
        );
    }
}

export default NPSComponent;
