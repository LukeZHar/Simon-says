import React, { Component } from "react";
import "./SimonSays.css";

const colors = ["red", "green", "blue", "yellow"];

export default class SimonSays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sequence: [],
            userSequence: [],
            level: 0,
            isUserTurn: false,
            gameOver: false,
        };
    }
}