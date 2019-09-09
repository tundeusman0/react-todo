import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const HomePage = () => {
  const props = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -500 }
  });
  return (
    <div className="homePage">
      <div>
        <h1>Welcome to My React Todo App</h1>
        <h2>This app is a simple app to create a user and todo lists</h2>
      </div>
      <animated.div style={props}>
        <div className="Navbar">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </animated.div>
    </div>
  );
};

export default HomePage;
