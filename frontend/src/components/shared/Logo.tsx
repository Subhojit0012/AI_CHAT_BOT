import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css"

export default function Logo() {
    return (
      <div className="logo-container">
        <Link to={"/"}>
          <img
            src="ai.png"
            alt="ai"
            className="logo-image"
          />
        </Link>
        <Typography className="logo-text">
            <span className="logo-mern">MERN</span>-GPT
        </Typography>
      </div>
    );
  }