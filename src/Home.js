import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    let uiToRemove = document.getElementsByClassName("mindar-ui-overlay");
    for (let e of uiToRemove) {
      e.remove();
    }
  }, []);

  const targets = ["delta032", "kappa017", "theta089"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        height: "100%",
        padding: 30,
        boxSizing: "border-box",
        backgroundColor: "#242424",
      }}
    >
      {targets.map((target) => (
        <Link to={`ar/${target}`} key={target}>
          <img
            src={`/mind-ar-test/target_image/${target}.png`}
            alt={target}
            style={{
              height: "25vh",
              borderRadius: 10,
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default Home;
