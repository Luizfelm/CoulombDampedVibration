# CoulombDampedVibration

## Overview

CoulombDampedVibration is a web-based simulation tool for analyzing mechanical vibration systems with Coulomb damping. The application uses numerical methods (Runge-Kutta 4th order) to simulate the motion of a mass-spring-damper system and provides visualizations of displacement and velocity over time.

## Features

- **Interactive Input Form**: Customize simulation parameters such as mass, spring constant, Coulomb force, initial displacement, and velocity.
- **Dynamic Graphs**: Visualize displacement vs. time and velocity vs. time using interactive Plotly.js charts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Animation**: Smooth transitions and animations powered by Framer Motion.
- **Custom Components**: Includes reusable and styled input components.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Library for animations and transitions.
- **Plotly.js**: Library for creating interactive charts.
- **Runge-Kutta Method**: Numerical method for solving differential equations.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CoulombDampedVibration.git
   cd CoulombDampedVibration

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Adjust the simulation parameters in the input form:
    - **Mass (m)**: Mass of the system (kg).
    - **Spring Constant (k)**: Stiffness of the spring (N/m).
    - **Coulomb Force (Fc)**: Frictional force (N).
    - **Initial Displacement (x0)**: Starting position of the mass (m).
    - **Initial Velocity (v0)**: Starting velocity of the mass (m/s).
    - **Total Time (T)**: Duration of the simulation (s).

2. View the results in the interactive graphs:
    - **Displacement vs. Time**: Shows how the position of the mass changes over time.
    - **Velocity vs. Time**: Displays the velocity of the mass over time.

3. Modify parameters and observe the updated results in real-time.


## Dependencies

- **React**: ^19.1.0
- **Framer Motion**: ^12.6.3
- **Plotly.js**: ^3.0.1
- **React Plotly.js**: ^2.6.0
- **Tailwind CSS**: ^3.4.17

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Inspired by mechanical vibration systems and numerical simulation techniques.
- Built with React and Tailwind CSS for a modern and responsive design.