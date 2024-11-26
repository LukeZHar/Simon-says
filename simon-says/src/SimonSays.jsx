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
            score: 0, // added score state
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.level !== this.state.level) {
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            this.setState(
                (prevState) => ({
                    sequence: [...prevState.sequence, newColor],
                    userSequence: [],
                    isUserTurn: false,
                }),
                () => {
                    this.playSequence();
                }
            );
        }
    }

    playSequence = async () => {
        for (let color of this.state.sequence) {
            await this.highlightColor(color);
            await this.delay(1000);
        }
        this.setState({ isUserTurn: true });
    };

    highlightColor = (color) => {
        return new Promise((resolve) => {
            const element = document.getElementById(color);
            if (element) {
                element.classList.add("active");
                setTimeout(() => {
                    element.classList.remove("active");
                    resolve();
                }, 500);
            }
        })
    }

    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    handleUserInput = (color) => {
        if (!this.state.isUserTurn) return;

        this.setState(
            (prevState) => ({
                userSequence: [...prevState.userSequence, color],
            }),
            () => {
                this.checkInput();
            }
        );
    };

    checkInput = () => {
        const { userSequence, sequence } = this.state;
        const currentLevelColor = sequence[userSequence.length - 1];

        if (userSequence[userSequence.length - 1] !== currentLevelColor) {
            this.setState({ gameOver: true, isUserTurn: false });
            alert("Game Over! Try Again.");
        } else if (userSequence.length === sequence.length) {
            this.setState((prevState) => ({
                level: prevState.level + 1,
                isUserTurn: false,
            }));
        }
    };

    startGame = () => {
        this.setState({
            sequence: [],
            userSequence: [],
            level: 1,
            isUserTurn: false,
            gameOver: false,
            score: 0, // reset score
        });
    };

    render() {
        return (
            <div className="App">
                <h1>Simon Says</h1>
                {this.state.gameOver && (
                    <div>
                        <h2>Game Over!</h2>
                        <p>Your final score is: {this.state.level}</p>
                        <button onClick={this.startGame}>Restart</button>
                    </div>
                )}
                {!this.state.gameOver && (
                    <button onClick={this.startGame}>Start Game</button>
                )}
                <div className="game-board">
                    {colors.map((color) => (
                        <div
                            key={color}
                            id={color}
                            className={`color-button ${color}`}
                            onClick={() => this.handleUserInput(color)}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

