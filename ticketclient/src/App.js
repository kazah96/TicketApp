import React, { Component } from 'react';
import './App.css';
import { NetworkManager } from './NetworkManager.js'

import NavPanel from './Components/NavPanel.js';
import LoginForm from './Components/LoginForm.js';
import Trip from './Components/Trip.js';
import SearchBar from './Components/SearchBar.js';
import FoundTrips from './Components/FoundTrips.js';
import RandomTrips from './Components/RandomTrips.js';
import Editor from './Components/Editor.js';

import RegistrationForm from './Components/RegistrationForm.js'
import AuthForm from './Components/AuthForm.js'
import MyTickets from './Components/MyTickets.js'
import TripBlock from './Components/TripBlock.js'

import loading from './loading.gif'


class Bus extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <h1>Buses</h1>
	}

}


class Loading extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="text-center loading">
				<img src={loading} />
			</div>
		)
	}

}


class TicketBuyForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <h1>fwsd</h1>
	}

}

class Error extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="alert"><h1>{this.props.data}</h1></div>

	}

}



class Booking extends Component {
	constructor(props) {
		super(props);
	}

	booking = () => {
		if (this.props.status == false) {
			return (
				<div className="booking-failure">
					<h1>Не удалось забронировать</h1>
				</div>
			)
		}
		else {
			return (

				<div className="booking-success">
					<h1>Успешно забронировано </h1>

				</div>
			)
		}

	}

	render() {
		return this.booking()
	}

}



class Schedule extends Component {
	constructor(props) {
		super(props);

		this.state =
			{
				user: undefined,
				data: undefined
			}
	}

	render() {
		return (
			<div>
				<h4 className="text_city"> Расписание <span className="username">{this.props.user.name}</span></h4>
				<hr />
				{this.props.data.map((o, id) => <TripBlock onClick={c => { }} data={o} />)}
			</div>
		)
	}

}




class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			vv: "li1",
			userTickets: undefined,
			selectedItem: "trip",
			tripData: undefined,
			user: undefined,
			editordata: undefined,
			bookingStatus: false,
			logStatus: 'notlogged'
		};

		this.changeMainComponent = this.changeMainComponent.bind(this);
		this.onLogged = this.onLogged.bind(this);
	}

	componentDidMount() {
		NetworkManager.getInfo("getsession", o => this.onSessionResult(o));
	}

	onSessionResult = (o) => {
		console.log(o)
		if (o.status == 200) {
			o.json().then(q => this.loginSuccess(q));
		}
	}


	onSession = (q) => {
		console.log(q);
	}


	changeMainComponent = (component) => {
		this.setState({ selectedItem: component });
	}

	onLogged = (user) => {
		this.setState({ user: user });
	}

	onSearchRequest = (trip) => {
		NetworkManager.getInfo('FindTrip', o => this.onRecievedRequest(o), undefined, trip)
		this.setState({ selectedItem: 'loading' });
	}

	onRecievedRequest = (r) => {
		console.clear();
		console.log(r);
		if (r.status != 200) {
			this.setState({ selectedItem: "notFound" })
			return;
		}


		r.json().then(o => {
			this.setState({ tripData: o });
			this.setState({ selectedItem: 'foundTrips' });



		});

	}

	onJson = (r) => {
	}

	dPanel = () => {
	}

	onClickRandomTrips = (id) => {
		this.onSearchRequest(id)
	}

	tryOpenBookingForm = (id) => {
		if (this.state.user === undefined) {
			this.setState({ selectedItem: "login" });
			return;
		}
	}

	onFoundTripsClick = (data) => {

		if (this.state.logStatus == 1) {
			NetworkManager.sendInfo("booking",
				{ tripid: data.id, userid: this.state.user.id }, o => this.onBookingRequestFinished(o))
		}
		else if (this.state.logStatus == 'notlogged') {
			this.setState({ error: "Войдите чтобы забронировать" })
			this.setState({ selectedItem: "error" })
			
		}

	}

	onBookingRequestFinished = (r) => {


		if (r.status != 200) {
			this.setState({ bookingStatus: false })
		}
		else {
			this.setState({ bookingStatus: true })
		}

		this.setState({ selectedItem: 'booking' })

	}


	onRegFormSubmit = (data) => {
		NetworkManager.sendInfo('Registration', data, o => console.log(o)); // MAKE REGCOMPLETE
	}

	onLoginFormSubmit = (data) => {
		NetworkManager.sendInfo('Login', data, o => this.onLoginRequestFinished(o)); // MAKE REGCOMPLETE
	}

	onLoginRequestFinished = (data) => {
		if (data.status == 204) {
			this.loginFailed()
			return;
		}
		if (data.status == 200) {
			data.json().then(w => this.loginSuccess(w));
			return;

		}


	}

	loginSuccess = (w) => {
		console.log(w)
		this.setState({ user: w });
		this.setState({ logStatus: w.userRoleId })

	}

	onTicketsLoaded = (w) => {
		console.log(w);
		this.setState({ userTickets: w })
		this.setState({ selectedItem: "myTickets" })
	}

	loginFailed = () => {

	}

	myTicketsForm = () => {

		if (this.state.user !== undefined) {
			this.setState({ selectedItem: "loading" })
			NetworkManager.getInfo("booking", o => o.json().then(w => this.onTicketsLoaded(w)), this.state.user.id)

		}
	}

	loadEditorData = (req) => {
		NetworkManager.getInfo(req, o => o.json().then(w => this.onEditorDataLoaded(w)));
		this.setState({ selectedItem: 'loading' });
	}

	onEditorDataLoaded = (data) => {
		this.setState({ editordata: data });
		this.setState({ selectedItem: "editor" });
	}

	onCancelBooking = (id) => {

		NetworkManager.deleteInfo("Booking", id, o => this.myTicketsForm());

	}

	onEditorSaved = (data) => {
		console.log("saved")
		data.forEach(q => {
			NetworkManager.updateInfo(this.state.editortable, q);
		})
	}

	loadEditor = () => {
		this.loadEditorData();
	}

	routeEditor = () => {
		this.setState({ editortable: 'routes' })
		this.loadEditorData("routes")
	}

	busEditor = () => {
		this.setState({ editortable: 'busdrivers' })
		this.loadEditorData("busdrivers")
	}

	schedule = () => {
		NetworkManager.getInfo("schedule", o => o.json().then(w => this.onScheduleDataLoaded(w)), this.state.user.id);
	}

	onScheduleDataLoaded = (w) => {
		this.setState({ scheduleData: w });
		this.setState({ selectedItem: 'schedule' });
	}

	logout = () => {
		NetworkManager.getInfo("logoff", o => {
			this.setState({selectedItem:"trips"})
			this.setState({logStatus:"notlogged"});
			this.setState({user:undefined});
			
		});
	}

	componentPicker = (component) => {
		if (component == "trip")
			return <Trip />;

		if (component == "schedule")
			return <Schedule
				data={this.state.scheduleData}
				user={this.state.user}
			/>;
		if (component == "error") {
			return <Error data={this.state.error} />
		}
		if (component == "bus")
			return <Bus />;
		if (component == "login")
			return <LoginForm onLogged={this.onLogged} />;
		if (component == "foundTrips")
			return <FoundTrips data={this.state.tripData} onClick={this.onFoundTripsClick} />;
		if (component == "notFound")
			return <h1 className="alert">Отправления не найдены</h1>;
		if (component == "loading")
			return <Loading />
		if (component == "editor")
			return <Editor data={this.state.editordata}
				header={this.state.editortable}
				onSubmit={this.onEditorSaved} />
		if (component == "booking")
			return <Booking status={this.state.bookingStatus} />
		if (component == "myTickets")
			return <MyTickets
				data={this.state.userTickets}
				cancel={this.onCancelBooking}
			/>


	}

	render() {
		const { selectedItem } = this.state;


		return (
			<div>
				<NavPanel callbackFn={this.changeMainComponent}
					user={this.state.user}
					status={this.state.logStatus}
					myTickets={this.myTicketsForm}
					routeEdit={this.routeEditor}
					busEdit={this.busEditor}
					schedule={this.schedule}
					logout={this.logout}
				/>

				<div className="container">

					<SearchBar onRequest={this.onSearchRequest} />

					{this.componentPicker(selectedItem)}

					<hr />
					<RandomTrips onClickCallback={this.onClickRandomTrips} />

				</div>
				<RegistrationForm onSubmit={this.onRegFormSubmit} />
				<AuthForm onSubmit={this.onLoginFormSubmit} />

			</div>

		)
	}
}


export default App;