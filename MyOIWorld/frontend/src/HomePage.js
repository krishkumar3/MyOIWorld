import './App.css';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { Component } from 'react';
import AtmChart from './lineChart';
import useWebSocket from 'react-use-websocket';
import OIChart from './OIChart';
const pdata = [
    { time: '9:15', premium: 308.35 },
    { time: '9:16', premium: 309.35 },
    { time: '9:17', premium: 311.15 },
    { time: '9:18', premium: 310.05 },
    { time: '9:19', premium: 308.5 },
    { time: '9:20', premium: 306.2 },
    { time: '9:21', premium: 305.5 },
    { time: '9:22', premium: 306.85 },
    { time: '9:23', premium: 306.6 },
    { time: '9:24', premium: 307.95 },
    { time: '9:25', premium: 307.85 },
    { time: '9:26', premium: 308.55 },
    { time: '9:27', premium: 308.3 },
    { time: '9:28', premium: 309.35 },
    { time: '9:29', premium: 310.65 },
    { time: '9:30', premium: 308 },
    { time: '9:31', premium: 308.9 },
    { time: '9:32', premium: 306.35 },
    { time: '9:33', premium: 306.85 },
    { time: '9:34', premium: 308.2 },
    { time: '9:35', premium: 309.8 },
    { time: '9:36', premium: 307.65 },
    { time: '9:37', premium: 306.25 },
    { time: '9:38', premium: 306.25 },
    { time: '9:39', premium: 307.15 },
    { time: '9:40', premium: 306.95 },
    { time: '9:41', premium: 306.85 },
    { time: '9:42', premium: 307.35 },
    { time: '9:43', premium: 307.15 },
    { time: '9:44', premium: 308.55 },
    { time: '9:45', premium: 305.95 },
    { time: '9:46', premium: 306.55 },
    { time: '9:47', premium: 306.35 },
    { time: '9:48', premium: 306.65 },
    { time: '9:49', premium: 306.1 },
    { time: '9:50', premium: 306.7 },
    { time: '9:51', premium: 309.3 },
    { time: '9:52', premium: 311.05 },
    { time: '9:53', premium: 310.6 },
    { time: '9:54', premium: 310.5 },
    { time: '9:55', premium: 310.9 },
    { time: '9:56', premium: 311.75 },
    { time: '9:57', premium: 311.5 },
    { time: '9:58', premium: 311 },
    { time: '9:59', premium: 310.7 },
    { time: '10:00', premium: 311.15 },
    { time: '10:01', premium: 312.85 },
    { time: '10:02', premium: 312.15 },
    { time: '10:03', premium: 312.2 },
    { time: '10:04', premium: 312.95 },
    { time: '10:05', premium: 313.5 },
    { time: '10:06', premium: 310.9 },
    { time: '10:07', premium: 312.05 },
    { time: '10:08', premium: 311.65 },
    { time: '10:09', premium: 311.75 },
    { time: '10:10', premium: 310.6 },
    { time: '10:11', premium: 310.65 },
    { time: '10:12', premium: 311 },
    { time: '10:13', premium: 310.75 },
    { time: '10:14', premium: 310.35 },
    { time: '10:15', premium: 306.9 },
    { time: '10:16', premium: 307.8 },
    { time: '10:17', premium: 306.95 },
    { time: '10:18', premium: 307.15 },
    { time: '10:19', premium: 307.3 },
    { time: '10:20', premium: 307.2 },
    { time: '10:21', premium: 307.3 },
    { time: '10:22', premium: 307.45 },
    { time: '10:23', premium: 307.9 },
    { time: '10:24', premium: 306.9 },
    { time: '10:25', premium: 307.25 },
    { time: '10:26', premium: 307.65 },
    { time: '10:27', premium: 307.6 },
    { time: '10:28', premium: 306.75 },
    { time: '10:29', premium: 306 },
    { time: '10:30', premium: 304.95 },
    { time: '10:31', premium: 306.2 },
    { time: '10:32', premium: 305.8 },
    { time: '10:33', premium: 306.05 },
    { time: '10:34', premium: 306.2 },
    { time: '10:35', premium: 306.25 },
    { time: '10:36', premium: 306.6 },
    { time: '10:37', premium: 306.1 },
    { time: '10:38', premium: 306.95 },
    { time: '10:39', premium: 306.25 },
    { time: '10:40', premium: 305.55 },
    { time: '10:41', premium: 305.7 },
    { time: '10:42', premium: 305.25 },
    { time: '10:43', premium: 305 },
    { time: '10:44', premium: 305.4 },
    { time: '10:45', premium: 306.15 },
    { time: '10:46', premium: 305.6 },
    { time: '10:47', premium: 305.75 },
    { time: '10:48', premium: 306.1 },
    { time: '10:49', premium: 305.95 },
    { time: '10:50', premium: 306.1 },
    { time: '10:51', premium: 306.05 },
    { time: '10:52', premium: 305.65 },
    { time: '10:53', premium: 306.25 },
    { time: '10:54', premium: 306.15 },
    { time: '10:55', premium: 305.35 },
    { time: '10:56', premium: 305.15 },
    { time: '10:57', premium: 306.35 },
    { time: '10:58', premium: 307.7 },
    { time: '10:59', premium: 305.9 },
    { time: '11:00', premium: 306.8 },
    { time: '11:01', premium: 306.4 },
    { time: '11:02', premium: 305.85 },
    { time: '11:03', premium: 306.35 },
    { time: '11:04', premium: 305.5 },
    { time: '11:05', premium: 305.9 },
    { time: '11:06', premium: 305.1 },
    { time: '11:07', premium: 305.6 },
    { time: '11:08', premium: 305.75 },
    { time: '11:09', premium: 305.15 },
    { time: '11:10', premium: 305.95 },
    { time: '11:11', premium: 308.15 },
    { time: '11:12', premium: 306.85 },
    { time: '11:13', premium: 306.9 },
    { time: '11:14', premium: 307.5 },
    { time: '11:15', premium: 307.45 },
    { time: '11:16', premium: 308.1 },
    { time: '11:17', premium: 307.2 },
    { time: '11:18', premium: 307 },
    { time: '11:19', premium: 306.95 },
    { time: '11:20', premium: 307.9 },
    { time: '11:21', premium: 307.3 },
    { time: '11:22', premium: 307.45 },
    { time: '11:23', premium: 307.1 },
    { time: '11:24', premium: 307.9 },
    { time: '11:25', premium: 307.95 },
    { time: '11:26', premium: 308.5 },
    { time: '11:27', premium: 310.35 },
    { time: '11:28', premium: 310.45 },
    { time: '11:29', premium: 310.25 },
    { time: '11:30', premium: 310.35 },
    { time: '11:31', premium: 309.15 },
    { time: '11:32', premium: 309.85 },
    { time: '11:33', premium: 309.85 },
    { time: '11:34', premium: 310.95 },
    { time: '11:35', premium: 309.45 },
    { time: '11:36', premium: 309.4 },
    { time: '11:37', premium: 310.4 },
    { time: '11:38', premium: 310.6 },
    { time: '11:39', premium: 311.25 },
    { time: '11:40', premium: 311.05 },
    { time: '11:41', premium: 311.05 },
    { time: '11:42', premium: 310.65 },
    { time: '11:43', premium: 311 },
    { time: '11:44', premium: 310.15 },
    { time: '11:45', premium: 310.2 },
    { time: '11:46', premium: 311.25 },
    { time: '11:47', premium: 312.1 },
    { time: '11:48', premium: 311.9 },
    { time: '11:49', premium: 312 },
    { time: '11:50', premium: 312.7 },
    { time: '11:51', premium: 312.4 },
    { time: '11:52', premium: 311.85 },
    { time: '11:53', premium: 311.6 },
    { time: '11:54', premium: 310.5 },
    { time: '11:55', premium: 310.75 },
    { time: '11:56', premium: 309.9 },
    { time: '11:57', premium: 310.2 },
    { time: '11:58', premium: 308.5 },
    { time: '11:59', premium: 309.05 },
    { time: '12:00', premium: 308.5 },
    { time: '12:01', premium: 307.2 },
    { time: '12:02', premium: 308.3 },
    { time: '12:03', premium: 308.2 },
    { time: '12:04', premium: 308.1 },
    { time: '12:05', premium: 309.4 },
    { time: '12:06', premium: 309.9 },
    { time: '12:07', premium: 309.75 },
    { time: '12:08', premium: 310.45 },
    { time: '12:09', premium: 309.4 },
    { time: '12:10', premium: 310.7 },
    { time: '12:11', premium: 310.5 },
    { time: '12:12', premium: 310 },
    { time: '12:13', premium: 310 },
    { time: '12:14', premium: 310.85 },
    { time: '12:15', premium: 311.3 },
    { time: '12:16', premium: 310 },
    { time: '12:17', premium: 310.75 },
    { time: '12:18', premium: 310.2 },
    { time: '12:19', premium: 310.7 },
    { time: '12:20', premium: 310.2 },
    { time: '12:21', premium: 310.75 },
    { time: '12:22', premium: 310.2 },
    { time: '12:23', premium: 310.35 },
    { time: '12:24', premium: 309.3 },
    { time: '12:25', premium: 310.75 },
    { time: '12:26', premium: 310.95 },
    { time: '12:27', premium: 310.75 },
    { time: '12:28', premium: 310.75 },
    { time: '12:29', premium: 310.6 },
    { time: '12:30', premium: 310.65 },
    { time: '12:31', premium: 311.35 },
    { time: '12:32', premium: 311.9 },
    { time: '12:33', premium: 312 },
    { time: '12:34', premium: 312.5 },
    { time: '12:35', premium: 314.95 },
    { time: '12:36', premium: 315.4 },
    { time: '12:37', premium: 315.85 },
    { time: '12:38', premium: 315.9 },
    { time: '12:39', premium: 315.25 },
    { time: '12:40', premium: 313.6 },
    { time: '12:41', premium: 311.9 },
    { time: '12:42', premium: 311.05 },
    { time: '12:43', premium: 312.3 },
    { time: '12:44', premium: 312 },
    { time: '12:45', premium: 314.75 },
    { time: '12:46', premium: 315.3 },
    { time: '12:47', premium: 317 },
    { time: '12:48', premium: 317.05 },
    { time: '12:49', premium: 318.35 },
    { time: '12:50', premium: 318.75 },
    { time: '12:51', premium: 318.45 },
    { time: '12:52', premium: 318.05 },
    { time: '12:53', premium: 318.75 },
    { time: '12:54', premium: 319.05 },
    { time: '12:55', premium: 319.15 },
    { time: '12:56', premium: 319.85 },
    { time: '12:57', premium: 320.15 },
    { time: '12:58', premium: 321.5 },
    { time: '12:59', premium: 319 },
    { time: '13:00', premium: 319.05 },
    { time: '13:01', premium: 315.85 },
    { time: '13:02', premium: 315.3 },
    { time: '13:03', premium: 313.75 },
    { time: '13:04', premium: 314.25 },
    { time: '13:05', premium: 314.6 },
    { time: '13:06', premium: 314.4 },
    { time: '13:07', premium: 317.95 },
    { time: '13:08', premium: 318.35 },
    { time: '13:09', premium: 317.6 },
    { time: '13:10', premium: 318.1 },
    { time: '13:11', premium: 317.4 },
    { time: '13:12', premium: 317.8 },
    { time: '13:13', premium: 318.1 },
    { time: '13:14', premium: 318.6 },
    { time: '13:15', premium: 319.3 },
    { time: '13:16', premium: 318.5 },
    { time: '13:17', premium: 318.1 },
    { time: '13:18', premium: 318.95 },
    { time: '13:19', premium: 318.1 },
    { time: '13:20', premium: 318.6 },
    { time: '13:21', premium: 317.85 },
    { time: '13:22', premium: 317.3 },
    { time: '13:23', premium: 318.55 },
    { time: '13:24', premium: 318.4 },
    { time: '13:25', premium: 315.95 },
    { time: '13:26', premium: 315.85 },
    { time: '13:27', premium: 316.25 },
    { time: '13:28', premium: 316.85 },
    { time: '13:29', premium: 316.45 },
    { time: '13:30', premium: 317.1 },
    { time: '13:31', premium: 314.95 },
    { time: '13:32', premium: 316.25 },
    { time: '13:33', premium: 316.85 },
    { time: '13:34', premium: 316.95 },
    { time: '13:35', premium: 317.8 },
    { time: '13:36', premium: 315.95 },
    { time: '13:37', premium: 315.85 },
    { time: '13:38', premium: 315.5 },
    { time: '13:39', premium: 316.15 },
    { time: '13:40', premium: 314.8 },
    { time: '13:41', premium: 310.75 },
    { time: '15:28', premium: 303.4 },
    { time: '15:29', premium: 303.4 },
    { time: '15:30', premium: 303.4 },
];
const min = Math.round(Math.min(...pdata.map(o => o.premium)) - 5);
const max = Math.round(Math.max(...pdata.map(o => o.premium)) + 5);

console.log(min, max);

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nifty: "15220",
            bankNifty: "34552",
            cssNifty: "green",
            cssBankNifty: "red",
            page: "Home",
            showSidebar: false,
        };
        this.handleButton = this.handleButton.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleSidebar = this.handleSidebar.bind(this);
    }

    componentDidMount() {
        console.log("Starting");
        // const url = "wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
        const url = "wss://ewstream.edelweiss.in/";
        const updatesSocket = new WebSocket(url);
        var data = "NONE";
        updatesSocket.onmessage = (e) => {
            // setTimeout(() => {  console.log("World!"); }, 1000);
            console.log(e.data);
            data = e.data
            var min = 15100;
            var max = 15260;
            var prevNifty = Number(this.state.nifty);
            const randNifty = Number(min + Math.random() * (max - min)).toFixed(2);
            if (randNifty > prevNifty) {
                this.setState({ cssNifty: "green" });
            }
            else {
                this.setState({ cssNifty: "red" });
            }

            min = 35100;
            max = 35260;
            var prevBankNifty = Number(this.state.bankNifty);
            const randBankNifty = Number(min + Math.random() * (max - min)).toFixed(2);
            if (randBankNifty > prevBankNifty) {
                this.handleState("cssBankNifty", "green");
            }
            else {
                this.handleState("cssBankNifty", "red");
            }

            this.handleState("nifty", randNifty);
            this.handleState("bankNifty", randBankNifty);
            console.log(this.state);

        };

        updatesSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
    }
    handleState = (key, data) => {
        this.setState({ [key]: data })
    }
    handleButton(e) {
        e.preventDefault();
        this.setState({ "page": [e.target.value] });
        console.log(e.target.value);
        console.log(this.state);
    }

    handleSidebar(e) {
        e.preventDefault();
        this.setState({ showSidebar: !this.state.showSidebar })
        console.log(this.state);
    }

    render() {



        return (
            <div className="Main">
                <nav class="navbar sticky-top navbar-light bg-light">
                    <div class="navbar-header">
                        <button type="button" class="btn btn-default navbar-btn" style ={{"fontSize": "20px"}} onClick={this.handleSidebar}  aria-label="Left Align">
                            &#9776;
                        </button>
                        
                        <a class="navbar-brand" style ={{"fontSize": "1rem"}} href="#"> My OI World</a>
                    </div>
                    <div class="d-flex flex-row">
                        <button class="btn btn-success navbar-btn me-1" value="Strategy Builder" onClick={this.handleButton}>Strategy Builder</button>
                        <button class="btn btn-success navbar-btn me-1" value="Open Interest" onClick={this.handleButton}>Open Interest</button>
                        <button class="btn btn-success navbar-btn me-1" value="Straddle Charts" onClick={this.handleButton}>Straddle Charts</button>
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Username
                            </button>
                            <div class="dropdown-menu dropdown-menu-end" style={{ marginTop: "8px" }}>
                                <button class="dropdown-item" type="button">My Profile</button>
                                <button class="dropdown-item" type="button">Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>

                {this.state.page == "Open Interest" &&
                    <OIChart data={pdata} />
                }
                {this.state.page == "Straddle Charts" &&
                    <AtmChart data={pdata} />
                }


                {this.state.showSidebar &&

                    <div class="vertical-nav bg-white" id="sidebar">
                        <br></br>
                        <br></br>
                        <br></br>

                        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>

                        <ul class="nav flex-column bg-white mb-0">
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark bg-light">
                                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                    home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
                                    about
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
                                    services
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                                    Gallery
                                </a>
                            </li>
                        </ul>

                        <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

                        <ul class="nav flex-column bg-white mb-0">
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
                                    area charts
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
                                    bar charts
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
                                    pie charts
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link text-dark">
                                    <i class="fa fa-line-chart mr-3 text-primary fa-fw"></i>
                                    line charts
                                </a>
                            </li>
                        </ul>
                    </div>
                }

     



            </div>
        );
    }
}

export default HomePage;